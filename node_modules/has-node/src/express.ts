/**
 * @file Homekit Accessory Server Core Application
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import HAS from './HAS';
import {Pairing, Pairings} from './config';
import * as TLVEnums from './TLV/values';
import parseTLV from './TLV/parse';
import {encodeTLV, encodeTLVError, TLVITem} from './TLV/encode';
import SRP from './encryption/SRP';
import HKDF from './encryption/HKDF';
import * as ChaCha from './encryption/ChaCha20Poly1305AEAD';
const Ed25519 = require('ed25519');
const Curve25519 = require('curve25519-n2');
import Characteristic from './characteristic';

export default function (server: HAS): express.Express {
    const app: express.Express = express();

    //Decode TLV request body if exists / Set real TCP socket
    app.use((req: any, res, next) => {

        //TCP connection should stay open as lang as it wants to
        req.socket.setTimeout(0);
        req.socket.setKeepAlive(true, 1800000); //30 Minutes

        if (!req.headers['x-real-socket-id']) {
            res.end();
            return;
        }
        req.realSocket = server.TCPServer.connections[req.headers['x-real-socket-id']];
        if (!req.realSocket) {
            res.end();
            return;
        }
        res.removeHeader('x-powered-by');
        res.header('X-Real-Socket-ID', req.realSocket.ID);
        if (req.headers['content-type'] && req.headers['content-type'].indexOf('tlv') > -1) {
            let data = Buffer.alloc(0);
            req.on('data', function (chunk: Buffer) {
                data = Buffer.concat([data, chunk]);
            });
            req.on('end', function () {
                req.body = req.body || {};
                req.body.TLV = parseTLV(data);
                next();
            });
        } else
            next();
    });
    app.use(bodyParser.json({
        type: 'application/hap+json'
    }));
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //Pair Setup
    app.post('/pair-setup', (req: any, res) => {
        //console.log(req.body, req.realSocket.ID);
        res.header('Content-Type', 'application/pairing+tlv8');

        let currentState = (req.body.TLV[TLVEnums.TLVValues.state]) ? parseInt(req.body.TLV[TLVEnums.TLVValues.state].toString('hex')) : 0x00;

        //Sent parameters can be wrong, So we have to be ready for errors
        try {
            //Server is already paired
            if (server.config.statusFlag != 0x01) {
                res.end(encodeTLVError(TLVEnums.TLVErrors.unavailable, currentState));
                return;
            }

            //Too much failed tries / Server needs to be restarted
            if (server.config.failedAuthCounter > 100) {
                res.end(encodeTLVError(TLVEnums.TLVErrors.maxTries, currentState));
                return;
            }

            //M1 <iOS> -> M2 <Server>
            if (currentState === 0x01) {
                //Another pairing is already in process
                if (server.config.lastPairStepTime && new Date().getTime() - server.config.lastPairStepTime.getTime() < 30000 && server.config.SRP && server.config.SRP.socketID !== req.realSocket.ID) {
                    res.end(encodeTLVError(TLVEnums.TLVErrors.busy, currentState));
                    return;
                }
                server.config.lastPairStepTime = new Date();

                server.config.SRP = new SRP(server.config.setupCode);
                server.config.SRP.socketID = req.realSocket.ID;
                res.end(encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }, {
                        key: TLVEnums.TLVValues.publicKey,
                        value: server.config.SRP.getPublicKey()
                    }, {
                        key: TLVEnums.TLVValues.salt,
                        value: server.config.SRP.salt
                    }]));
                return;
            }

            server.config.lastPairStepTime = new Date();

            //M1&M2 is passed but we don't have an SRP object yet!
            if (!server.config.SRP) {
                res.end(encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
                return;
            }

            //M3 <iOS> -> M4 <Server>
            if (currentState === 0x03) {
                server.config.SRP.setClientPublicKey(req.body.TLV[TLVEnums.TLVValues.publicKey]);
                if (server.config.SRP.checkClientProof(req.body.TLV[TLVEnums.TLVValues.proof])) {
                    res.end(encodeTLV([
                        {
                            key: TLVEnums.TLVValues.state,
                            value: currentState + 1
                        }, {
                            key: TLVEnums.TLVValues.proof,
                            value: server.config.SRP.getM2Proof()
                        }]));
                    return;
                } else {
                    server.config.lastPairStepTime = undefined;
                    res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                }
                return;
            }

            //M5 <iOS> -> M6 <Server>
            if (currentState === 0x05) {
                let body = req.body.TLV[TLVEnums.TLVValues.encryptedData],
                    encryptedData = body.slice(0, body.length - 16),
                    tag = body.slice(body.length - 16),
                    key = HKDF(server.config.SRP.getSessionKey());

                let data = ChaCha.decrypt(key, 'PS-Msg05', tag, encryptedData);
                if (data === false)
                    res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                else {
                    let info = parseTLV(data as Buffer);

                    let iOSDeviceInfo = Buffer.concat([HKDF(server.config.SRP.getSessionKey(), 'Pair-Setup-Controller-Sign-Salt', 'Pair-Setup-Controller-Sign-Info'), info[TLVEnums.TLVValues.identifier], info[TLVEnums.TLVValues.publicKey]]);

                    if (Ed25519.Verify(iOSDeviceInfo, info[TLVEnums.TLVValues.signature], info[TLVEnums.TLVValues.publicKey])) {
                        server.config.addPairing(info[TLVEnums.TLVValues.identifier], info[TLVEnums.TLVValues.publicKey], true);

                        let accessoryInfo = Buffer.concat([HKDF(server.config.SRP.getSessionKey(), 'Pair-Setup-Accessory-Sign-Salt', 'Pair-Setup-Accessory-Sign-Info'), Buffer.from(server.config.deviceID), server.config.publicKey]);
                        let accessorySignature = Ed25519.Sign(accessoryInfo, server.config.privateKey);

                        let plainTLV = encodeTLV([
                            {
                                key: TLVEnums.TLVValues.identifier,
                                value: server.config.deviceID
                            },
                            {
                                key: TLVEnums.TLVValues.publicKey,
                                value: server.config.publicKey
                            },
                            {
                                key: TLVEnums.TLVValues.signature,
                                value: accessorySignature
                            }
                        ]);

                        res.end(encodeTLV([
                            {
                                key: TLVEnums.TLVValues.state,
                                value: currentState + 1
                            }, {
                                key: TLVEnums.TLVValues.encryptedData,
                                value: ChaCha.encrypt(key, 'PS-Msg06', plainTLV)
                            }]));
                    } else
                        res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                }
                return;
            }
        } catch (e) {
            console.error(e);
            server.config.lastPairStepTime = undefined;
            res.end(encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
        }
    });

    //Pair Verify
    app.post('/pair-verify', (req: any, res) => {
        //console.log(req.body, req.realSocket.ID);
        res.header('Content-Type', 'application/pairing+tlv8');

        let currentState = (req.body.TLV[TLVEnums.TLVValues.state]) ? parseInt(req.body.TLV[TLVEnums.TLVValues.state].toString('hex')) : 0x00;

        //Sent parameters can be wrong, So we have to be ready for errors
        try {
            //M1 <iOS> -> M2 <Server>
            if (currentState === 0x01) {
                let secretKey = Buffer.alloc(32);
                secretKey = Curve25519.makeSecretKey(secretKey);

                let publicKey = Curve25519.derivePublicKey(secretKey),
                    sharedKey = Curve25519.deriveSharedSecret(secretKey, req.body.TLV[TLVEnums.TLVValues.publicKey]);

                let accessoryInfo = Buffer.concat([publicKey, Buffer.from(server.config.deviceID), req.body.TLV[TLVEnums.TLVValues.publicKey]]);

                let accessorySignature = Ed25519.Sign(accessoryInfo, server.config.privateKey);

                let plainTLV = encodeTLV([
                    {
                        key: TLVEnums.TLVValues.identifier,
                        value: server.config.deviceID
                    },
                    {
                        key: TLVEnums.TLVValues.signature,
                        value: accessorySignature
                    }
                ]);

                let sessionKey = HKDF(sharedKey, 'Pair-Verify-Encrypt-Salt', 'Pair-Verify-Encrypt-Info');

                req.realSocket.HAPEncryption = {
                    serverSecretKey: secretKey,
                    serverPublicKey: publicKey,
                    sharedKey: sharedKey,
                    clientPublicKey: req.body.TLV[TLVEnums.TLVValues.publicKey],
                    sessionKey: sessionKey,
                    incomingFramesCounter: 0,
                    outgoingFramesCounter: 0,
                    isAdmin: false,
                };

                res.end(encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }, {
                        key: TLVEnums.TLVValues.encryptedData,
                        value: ChaCha.encrypt(sessionKey, 'PV-Msg02', plainTLV)
                    }, {
                        key: TLVEnums.TLVValues.publicKey,
                        value: publicKey
                    }]));
                return;
            }

            //M1&M2 is passed but we don't have an HAPEncryption object yet!
            if (!req.realSocket.HAPEncryption) {
                res.end(encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
                return;
            }

            //M3 <iOS> -> M4 <Server>
            if (currentState === 0x03) {
                let body = req.body.TLV[TLVEnums.TLVValues.encryptedData],
                    encryptedData = body.slice(0, body.length - 16),
                    tag = body.slice(body.length - 16);

                let data = ChaCha.decrypt(req.realSocket.HAPEncryption.sessionKey, 'PV-Msg03', tag, encryptedData);
                if (data === false)
                    res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                else {
                    let info = parseTLV(data as Buffer);

                    let pairing = server.config.getPairings(info[TLVEnums.TLVValues.identifier]);
                    if (pairing === false)
                        res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                    else {
                        pairing = pairing as Pairing;
                        let iOSDeviceInfo = Buffer.concat([req.realSocket.HAPEncryption.clientPublicKey, info[TLVEnums.TLVValues.identifier], req.realSocket.HAPEncryption.serverPublicKey]);
                        if (Ed25519.Verify(iOSDeviceInfo, info[TLVEnums.TLVValues.signature], Buffer.from(pairing.publicKey, 'hex'))) {
                            req.realSocket.HAPEncryption.accessoryToControllerKey = HKDF(req.realSocket.HAPEncryption.sharedKey, 'Control-Salt', 'Control-Read-Encryption-Key');
                            req.realSocket.HAPEncryption.controllerToAccessoryKey = HKDF(req.realSocket.HAPEncryption.sharedKey, 'Control-Salt', 'Control-Write-Encryption-Key');
                            req.realSocket.HAPEncryption.isAdmin = pairing.isAdmin;
                            req.realSocket.isEncrypted = true;
                            req.realSocket.isAuthenticated = true;
                            req.realSocket.clientID = info[TLVEnums.TLVValues.identifier].toString('utf8');

                            req.realSocket.keepAliveForEver();

                            res.end(encodeTLV([
                                {
                                    key: TLVEnums.TLVValues.state,
                                    value: currentState + 1
                                }]));
                        } else
                            res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                    }
                }
                return;
            }
        } catch (e) {
            console.error(e);
            res.end(encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
        }
    });

    //List of Accessories
    app.get('/accessories', (req: any, res) => {
        res.header('Content-Type', 'application/hap+json');

        if (!req.realSocket.isAuthenticated) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }

        let accessoriesObject = server.getAccessories(),
            accessories = [];
        for (let index in accessoriesObject)
            accessories.push(accessoriesObject[index].toJSON());
        res.end(JSON.stringify({
            accessories: accessories
        }));
    });

    //Add or remove a pairing
    app.post('/pairings', (req: any, res) => {
        //console.log(req.body, req.realSocket.ID);
        res.header('Content-Type', 'application/pairing+tlv8');

        let currentState = (req.body.TLV[TLVEnums.TLVValues.state]) ? parseInt(req.body.TLV[TLVEnums.TLVValues.state].toString('hex')) : 0x00;

        if (!req.realSocket.isAuthenticated || !req.realSocket.HAPEncryption.isAdmin) {
            res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
            return;
        }

        //Add New Pairing
        if (req.body.TLV[TLVEnums.TLVValues.method].toString('hex') == TLVEnums.TLVMethods.addPairing) {
            let pairing = server.config.getPairings(req.body.TLV[TLVEnums.TLVValues.identifier]);
            if (pairing === false) {
                server.config.addPairing(req.body.TLV[TLVEnums.TLVValues.identifier], req.body.TLV[TLVEnums.TLVValues.publicKey], req.body.TLV[TLVEnums.TLVValues.permissions].toString('hex') == '01');
                res.end(encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }]));
            } else {
                pairing = pairing as Pairing;
                if (pairing.publicKey == req.body.TLV[TLVEnums.TLVValues.publicKey].toString('hex')) {
                    server.config.updatePairing(req.body.TLV[TLVEnums.TLVValues.identifier], req.body.TLV[TLVEnums.TLVValues.permissions].toString('hex') == '01');
                    res.end(encodeTLV([
                        {
                            key: TLVEnums.TLVValues.state,
                            value: currentState + 1
                        }]));
                } else
                    res.end(encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
            }
            //Remove Pairing
        } else if (req.body.TLV[TLVEnums.TLVValues.method].toString('hex') == TLVEnums.TLVMethods.removePairing) {
            let pairing = server.config.getPairings(req.body.TLV[TLVEnums.TLVValues.identifier]);
            if (pairing === false)
                res.end(encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
            else {
                server.config.removePairing(req.body.TLV[TLVEnums.TLVValues.identifier]);
                res.end(encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }]));
                server.TCPServer.revokeConnections(req.body.TLV[TLVEnums.TLVValues.identifier].toString('utf8'));
            }
        } else
            res.end();
    });

    //List of Pairings
    app.get('/pairings', (req: any, res) => {
        console.log(req.body, req.realSocket.ID);
        res.header('Content-Type', 'application/pairing+tlv8');

        let currentState = 1;

        if (!req.realSocket.isAuthenticated || !req.realSocket.HAPEncryption.isAdmin) {
            res.end(encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
            return;
        }

        let pairings = server.config.getPairings() as Pairings,
            response: TLVITem[] = [{
                key: TLVEnums.TLVValues.state,
                value: currentState + 1
            }],
            offset = 0,
            total = Object.keys(pairings).length;
        for (let index in pairings) {
            let pairing = pairings[index];

            response.push({
                key: TLVEnums.TLVValues.identifier,
                value: Buffer.from(index, 'utf8')
            });
            response.push({
                key: TLVEnums.TLVValues.publicKey,
                value: Buffer.from(pairing.publicKey, 'hex')
            });
            response.push({
                key: TLVEnums.TLVValues.permissions,
                value: Buffer.from([pairing.isAdmin])
            });
            offset++;
            if (offset < total)
                response.push({
                    key: TLVEnums.TLVValues.separator,
                    value: Buffer.alloc(0)
                });
        }

        res.end(response);
    });

    //Read value of characteristics
    app.get('/characteristics', (req: any, res) => {
        //console.log(req.body, req.realSocket.ID);
        res.header('Content-Type', 'application/hap+json');

        if (!req.realSocket.isAuthenticated) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }

        let characteristics2Read = req.query.id.split(',');

        let characteristics: { [index: string]: any }[] = [],
            allOK = true;

        for (let characteristic of characteristics2Read) {
            characteristic = characteristic.split('.');
            let accessoryID = parseInt(characteristic[0]),
                characteristicID = parseInt(characteristic[1]);

            let object: { [index: string]: any } = {
                aid: accessoryID,
                iid: characteristicID
            };

            let accessory = server.getAccessories()[accessoryID],
                error = null,
                value = null;
            if (accessory) {
                let characteristic = accessory.getCharacteristic(characteristicID);
                if (characteristic) {
                    characteristic = characteristic as Characteristic;
                    if (characteristic.getHasValue())
                        value = characteristic.getValue();
                    else
                        error = TLVEnums.statusCodes.isWriteonly;

                    if (req.query.meta)
                        characteristic.addMetadata(object);

                    if (req.query.perms)
                        object['perms'] = characteristic.getPermissions();

                    if (req.query.type)
                        object['type'] = characteristic.getType();

                    if (req.query.ev)
                        object['ev'] = characteristic.getHasNotifications();
                } else
                    error = TLVEnums.statusCodes.notFound;
            } else
                error = TLVEnums.statusCodes.notFound;

            if (error) {
                object['status'] = error;
                allOK = false;
            } else {
                object['value'] = value;
                object['status'] = TLVEnums.statusCodes.OK;
            }

            characteristics.push(object);
        }

        if (allOK) {
            for (let characteristic of characteristics)
                delete characteristic['status'];
        }

        res.status(allOK ? 200 : 207).end(JSON.stringify({
            characteristics: characteristics
        }));
    });

    //Write value of characteristics
    app.put('/characteristics', async (req: any, res) => {
        //console.log(req.body);
        res.header('Content-Type', 'application/hap+json');

        if (!req.realSocket.isAuthenticated) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }

        let characteristics: {}[] = [],
            allOK = true;

        await Promise.all(req.body.characteristics.map(async (characteristic: any) => {
            let accessoryID = parseInt(characteristic.aid),
                characteristicID = parseInt(characteristic.iid),
                value = characteristic.value,
                event = characteristic.ev,
                authData = characteristic.authData;

            let accessory = server.getAccessories()[accessoryID],
                error = null;

            if (accessory) {
                let characteristic = accessory.getCharacteristic(characteristicID);
                if (characteristic) {
                    characteristic = characteristic as Characteristic;
                    if (event && !characteristic.getHasNotifications())
                        error = TLVEnums.statusCodes.notificationIsNotSupported;
                    if (!error) {
                        if (event)
                            characteristic.subscribe(req.realSocket.ID);

                        if (event === false)
                            characteristic.unsubscribe(req.realSocket.ID);

                        if (value != null && value != undefined) {
                            try {
                                await characteristic.writeValue(value, authData);
                            } catch (e) {
                                error = e;
                            }
                        }
                    }
                } else
                    error = TLVEnums.statusCodes.notFound;
            } else
                error = TLVEnums.statusCodes.notFound;

            let object: { [index: string]: any } = {
                aid: accessoryID,
                iid: characteristicID
            };

            if (error) {
                object['status'] = error;
                allOK = false;
            } else
                object['status'] = TLVEnums.statusCodes.OK;

            characteristics.push(object);
        }));

        if (allOK)
            res.removeHeader('Content-Type');
        res.status(allOK ? 204 : 207).end(allOK ? null : JSON.stringify({
            characteristics: characteristics
        }));

    });

    //Accessory Identify (Only when device is unpaired)
    app.get('/identify', (req: any, res) => {
        res.header('Content-Type', 'application/hap+json');

        //Server is already paired
        if (server.config.statusFlag != 0x01) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }

        if (server.onIdentify) {
            server.onIdentify(true, (status) => {
                if (status == TLVEnums.statusCodes.OK) {
                    res.removeHeader('Content-Type');
                    res.status(204).end();
                } else
                    res.status(500).end(JSON.stringify({
                        status: status
                    }));
            });
        } else
            res.status(500).end(JSON.stringify({
                status: TLVEnums.statusCodes.communicationError
            }));
    });

    return app;
};