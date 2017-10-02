/**
 * @file TCP/HTTP implementation for HAP
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */
import {EventEmitter} from 'events';
import * as NET from 'net';
import HAS from './HAS';
import * as ChaCha from './encryption/ChaCha20Poly1305AEAD';

const ExtendedBuffer = require('extended-buffer');
const delimiter = Buffer.from('\r\n');
const debug = require('debug')('TCP');


export default class TCP extends EventEmitter {

    /**
     * @property TCP Server
     * @private
     */
    private TCPServer: NET.Server;

    /**
     * @property TCP Connections to HTTP Server (Proxy)
     * @private
     */
    private TCPConnectionPool: any[] = [];

    /**
     * @property Max. length of TCP connection pool
     * @private
     */
    private readonly TCPConnectionPoolMax: number = 8;

    /**
     * @property TCP Server Port
     * @private
     */
    private TCPPort: number;

    /**
     * @property HTTP Server Port
     * @private
     */
    private HTTPPort: number;

    /**
     * @property Array of open connections
     * @private
     */
    public connections: { [index: string]: any } = {};

    /**
     * @property HAS Object
     * @private
     */
    private server: HAS;

    constructor(server: HAS) {
        super();

        this.server = server;

        this.TCPServer = NET.createServer();
        this.connections = [];

        this.TCPServer.on('listening', () => {
            this.emit('listening', this.TCPPort);
            debug('Listening on ' + this.TCPPort);
        });

        this.TCPServer.on('error', (error: any) => {
            console.error(error);
            debug(error);
        });

        this.TCPServer.on('connection', this.onConnection.bind(this));
    }

    /**
     * @method Starts the server
     */
    public listen(TCPPort: number, HTTPPort: number) {
        this.TCPPort = TCPPort;
        this.HTTPPort = HTTPPort;

        this.TCPServer.listen(this.TCPPort);

        for (let i = 0; i < this.TCPConnectionPoolMax; i++)
            this.createNewConnection();
    }

    /**
     * @method When we have a new connection
     * @param socket
     */
    private onConnection(socket: any) {
        socket.ID = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
        this.connections[socket.ID] = socket;

        debug(`${socket.ID} connected`);

        socket.on('close', () => {
            debug(`${socket.ID} disconnected`);
            delete this.connections[socket.ID];

            //Make pairing available again if necessary
            if (this.server.config.SRP && this.server.config.SRP.socketID === socket.ID) {
                this.server.config.SRP = undefined;
                this.server.config.lastPairStepTime = undefined;
            }

            socket.end();
            socket.destroy();
        });

        socket.on('data', (data: Buffer) => {
            debug(`${socket.ID} packet received`);
            if (socket.isEncrypted) {
                socket.hasReceivedEncryptedData = true;

                let result = Buffer.alloc(0);
                for (let index = 0; index < data.length;) {
                    let AAD = data.slice(index, index + 2),
                        length = AAD.readUInt16LE(0),
                        encryptedData = data.slice(index + 2, index + 2 + length),
                        tag = data.slice(index + 2 + length, index + 2 + length + 16),
                        decrypted = ChaCha.expertDecrypt(socket.HAPEncryption.controllerToAccessoryKey, this.createNonce(socket.HAPEncryption.incomingFramesCounter), tag, encryptedData, AAD);
                    if (decrypted) {
                        result = Buffer.concat([result, decrypted as Buffer]);
                        index += index + 2 + length + 16;
                        socket.HAPEncryption.incomingFramesCounter++;
                    } else {
                        socket.emit('close');
                        return; //Will break both loop and function
                    }
                }
                data = result;
            }
            let {firstLine, rest} = this.readAndDeleteFirstLineOfBuffer(data);
            //console.log(data.toString('ascii'));
            this.write(Buffer.concat([firstLine, delimiter, Buffer.from(`X-Real-Socket-ID: ${socket.ID}`, 'ascii'), delimiter, rest]));
        });

        socket.setTimeout(3600000); //1Hour
        socket.on('timeout', () => {
            debug(`${socket.ID} timedout`);
            socket.emit('close');
        });

        socket.keepAliveForEver = () => {
            socket.setTimeout(0);

            socket.setKeepAlive(true, 1800000); //30Minutes
        };

        socket.safeWrite = (buffer: Buffer) => {
            if (socket.hasReceivedEncryptedData) { //Since we are dealing with async code, isEncrypted is set first but our last write in M6 will happen after that and we should not encrypt M6, So we will start encryption after we have received encrypted data from client
                //console.log(buffer.toString('ascii'));
                let result = Buffer.alloc(0);
                for (let index = 0; index < buffer.length;) {
                    let length = Math.min(buffer.length - index, 1024),
                        lengthBuffer = Buffer.alloc(2);
                    lengthBuffer.writeUInt16LE(length, 0);
                    let enceypted = ChaCha.expertEncrypt(socket.HAPEncryption.accessoryToControllerKey, this.createNonce(socket.HAPEncryption.outgoingFramesCounter), buffer.slice(index, index + length), lengthBuffer);
                    result = Buffer.concat([result, lengthBuffer, enceypted]);
                    index += length;
                    socket.HAPEncryption.outgoingFramesCounter++;
                }
                buffer = result;
            }
            debug(`${socket.ID} packet sent`);
            socket.write(buffer);
        };

        socket.sendNotification = (notification: string) => {
            let body = `EVENT/1.0 200 OK${delimiter}Content-Type: application/hap+json${delimiter}Content-Length: ${notification.length}${delimiter}${delimiter}${notification}`;
            socket.safeWrite(Buffer.from(body));
        };

        socket.on('error', (error: any) => {
            debug(error);
        });
    }

    /**
     * @method Creates nonce buffer for encryption and decryption
     * @param framesCounter
     */
    private createNonce(framesCounter: number): Buffer {
        let buffer = new ExtendedBuffer();
        buffer.writeUInt64LE(framesCounter);
        return Buffer.concat([Buffer.alloc(4), buffer.buffer]);
    }

    /**
     * @method Writes buffer to socket
     */
    private write(buffer: Buffer) {
        let wrote = false;
        for (let connection of this.TCPConnectionPool) {
            if (!connection.isBusy) {
                connection.safeWrite(buffer);
                wrote = true;
                break;
            }
        }
        if (!wrote)
            this.createNewConnection().safeWrite(buffer);
    }

    /**
     * @method Whether or not we have a TCP connection which we can close it
     */
    private hasExtraOpenConnection(): boolean {
        if (this.TCPConnectionPool.length > this.TCPConnectionPoolMax && this.TCPConnectionPool.filter(connection => !connection.isBusy).length >= 1)
            return true;

        return false;
    }

    /**
     * @method Creates TCP socket to HTTP server
     */
    private createNewConnection(): any {
        let connection = NET.createConnection(this.HTTPPort) as any;

        connection.on('connect', () => {
            debug('New socked connected.');
            connection.isConnected = true;
            if (connection.pendingWrite) {
                connection.safeWrite(connection.pendingWrite);
                delete connection.pendingWrite;
            }
        });

        connection.on('error', (error: any) => {
            debug(error);

            connection.emit('close');
        });

        connection.on('close', () => {
            this.TCPConnectionPool.splice(this.TCPConnectionPool.indexOf(connection), 1);

            debug(`Socked disconnected. Remained: ${this.TCPConnectionPool.length}`);

            connection.end();
            connection.destroy();
        });

        //TCP connection should stay open as lang as it wants to
        connection.setTimeout(0);
        connection.setKeepAlive(true, 1800000); //30 Minutes

        connection.setNoDelay(0);

        connection.on('data', (data: Buffer) => {
            debug(`Data received from HTTP.`);
            //Handle Multipart Responses
            let {firstLine: veryFirstLine, rest} = this.readAndDeleteFirstLineOfBuffer(data);
            if (veryFirstLine.toString().indexOf('HTTP') > -1) {
                let socketID = '',
                    contentLength = '0',
                    headers = Buffer.alloc(0),
                    rests = data;

                rests = rest;
                headers = veryFirstLine;
                while (true) {
                    let {firstLine, rest} = this.readAndDeleteFirstLineOfBuffer(rests);
                    let currentLine = firstLine.toString('utf8');
                    rests = rest;
                    if (currentLine.indexOf('X-Real-Socket-ID') > -1)
                        socketID = this.readHeaderValue(currentLine);
                    else if (currentLine.indexOf('Content-Length') > -1)
                        contentLength = this.readHeaderValue(currentLine);
                    headers = Buffer.concat([headers, delimiter, firstLine]);
                    if (firstLine.length === 0)
                        break;
                }

                connection.pendingRead = {
                    expectedLength: parseInt(contentLength),
                    headers: headers,
                    socketID: socketID,
                    body: rests
                };
            } else
                connection.pendingRead.body = Buffer.concat([connection.pendingRead.body, data]);

            if (connection.pendingRead.body.length >= connection.pendingRead.expectedLength) {
                if (this.connections[connection.pendingRead.socketID])
                    this.connections[connection.pendingRead.socketID].safeWrite(Buffer.concat([connection.pendingRead.headers, delimiter, connection.pendingRead.body]));

                connection.isBusy = false;

                if (this.hasExtraOpenConnection())
                    connection.emit('close');
            }
        });

        connection.safeWrite = (buffer: Buffer) => {
            connection.isBusy = true;
            if (connection.isConnected) {
                debug(`Data sent to HTTP.`);
                connection.write(buffer);
            } else {
                connection.pendingWrite = connection.pendingWrite || Buffer.alloc(0);
                connection.pendingWrite = Buffer.concat([connection.pendingWrite, buffer]);
            }
        };

        this.TCPConnectionPool.push(connection);
        return connection;
    }

    /**
     * @method Reads the first line of a HTTP header buffer
     * @param buffer
     * @returns {{firstLine: Buffer, rest: Buffer}}
     */
    private readAndDeleteFirstLineOfBuffer(buffer: Buffer): { firstLine: Buffer, rest: Buffer } {
        let firstLine = Buffer.alloc(0);
        for (let index = 0; index < buffer.length; index++) {
            if (buffer[index] == delimiter[0] && buffer[index + 1] == delimiter[1])
                break;
            else
                firstLine = Buffer.concat([firstLine, buffer.slice(index, index + 1)]);
        }
        return {firstLine: firstLine, rest: buffer.slice(firstLine.length + delimiter.length)};
    }

    /**
     * @methdo Splits header value
     * @param {string} header
     * @returns {any}
     */
    private readHeaderValue(header: string): any {
        return (header.split(':')[1]).trim();
    }

    /**
     * @method Closes the server
     */
    public close(callback?: () => void) {
        for (let connection of this.TCPConnectionPool)
            connection.emit('close');

        this.TCPServer.close(callback);

        for (let socketID in this.connections)
            this.connections[socketID].emit('close');
    }

    /**
     * @method Send notification to clients
     * @param socketIDs
     * @param notification
     * @returns {Array}
     */
    public sendNotification(socketIDs: string[], notification: string): string[] {
        let sent = [];
        for (let socketID of socketIDs) {
            if (this.connections[socketID]) {
                this.connections[socketID].sendNotification(notification);
                sent.push(socketID);
            }
        }
        return sent;
    }

    /**
     * @method Revokes active sessions based on clientID
     * @param clientID
     */
    public revokeConnections(clientID: string) {
        for (let index in this.connections) {
            let connection = this.connections[index];
            if (connection.clientID == clientID) {
                connection.isAuthenticated = false;
                connection.isAdmin = false;
                setTimeout(() => {
                    connection.emit('close');
                }, 5000);
            }
        }
    }
}