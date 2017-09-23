/**
 * @file Homekit Accessory Server Configuration Helper
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as FS from 'fs';
import SRP from './encryption/SRP';
import * as crypto from 'crypto';

const Ed25519 = require('ed25519');
import HAS from './HAS';

export interface Pairing {
    publicKey: string,
    isAdmin: boolean
}

export interface Pairings {
    [ID: string]: Pairing
}

/**
 * @class HAS Configuration Helper
 */
export default class Config {

    /**
     * @property Device Name
     * @public
     * @requires
     */
    public deviceName: string;

    /**
     * @property Device ID
     * @public
     * @requires
     */
    public deviceID: string;

    /**
     * @property Current Configuration Number
     * @private
     * @look Table 5-7 in HAP Specification
     */
    private CCN: number = 1;

    /**
     * @property Feature Flag
     * @private
     * @readonly
     * @look Table 5-7 in HAP Specification
     */
    private readonly featureFlag: number = 0x00;

    /**
     * @property Protocol Version
     * @private
     * @readonly
     */
    private readonly protocolVersion: string = '1.0';

    /**
     * @property Current State Number
     * @private
     * @readonly
     * @look Table 5-7 in HAP Specification
     */
    private readonly CSN: number = 1;

    /**
     * @property Status Flag
     * @public
     * @look Table 5-7 in HAP Specification
     */
    public statusFlag: number = 0x01;

    /**
     * @property Accessory Category Identifier
     * @public
     * @requires
     * @look Table 12-3 in HAP Specification
     */
    public category: number;

    /**
     * @property Config File Location
     * @public
     * @requires
     */
    public configDir: string;

    /**
     * @property Failed Authentications Counter
     * @public
     */
    public failedAuthCounter: number = 0;

    /**
     * @property Timestamp of last attempt to pair
     * @public
     */
    public lastPairStepTime?: Date;


    /**
     * @property TCP Port
     * @public
     * @requires
     */
    public TCPPort: number;

    /**
     * @property Current in-use SRP Object
     * @public
     */
    public SRP?: SRP;

    /**
     * @property Server Setup Code
     * @public
     * @requires
     */
    public setupCode: string;


    /**
     * @property List of active pairings
     * @private
     */
    private pairings: Pairings = {};

    /**
     * @property Ed25519 Public Key
     * @public
     */
    public publicKey: Buffer;

    /**
     * @property Ed25519 Private Key
     * @public
     */
    public privateKey: Buffer;

    /**
     * @property Maps UUID to HAS ID
     * @private
     * @type {{}}
     */
    private UUIDMap: { [index: string]: number } = {};

    /**
     * @property An instance to this object's server
     * @private
     */
    private server: HAS;

    constructor(deviceName: string, deviceID: string, category: number, configDir: string, TCPPort: number, setupCode: string) {
        if (deviceName)
            this.deviceName = deviceName;
        else
            throw new Error('Invalid Device Name');

        if (deviceID && deviceID.match(/^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/))
            this.deviceID = deviceID;
        else
            throw new Error('Invalid Device ID');

        if (category && !isNaN(category) && category > 0 && category < 20)
            this.category = category;
        else
            throw new Error('Invalid Category Identifier');

        if (TCPPort && !isNaN(TCPPort) && TCPPort > 0)
            this.TCPPort = TCPPort;
        else
            throw new Error('Invalid HTTP Port');

        if (setupCode && setupCode.match(/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/))
            this.setupCode = setupCode;
        else
            throw new Error('Invalid Setup Code');

        if (configDir) {
            this.configDir = configDir;
            if (FS.existsSync(configDir)) {
                this.readConfig();
            } else {
                this.writeConfig();
            }
        } else
            throw new Error('Invalid Config File');
    }

    /**
     * @method Reads current config file
     */
    private readConfig() {
        let config = JSON.parse(FS.readFileSync(this.configDir, 'utf8'));
        if (config) {
            this.CCN = config.CCN;
            this.pairings = config.pairings || {};

            //Update status flag to avoid new pairings
            if (Object.keys(this.pairings).length > 0)
                this.statusFlag = 0x00;

            if (config.publicKey)
                this.publicKey = Buffer.from(config.publicKey, 'hex');
            if (config.privateKey)
                this.privateKey = Buffer.from(config.privateKey, 'hex');

            if (config.UUIDMap)
                this.UUIDMap = config.UUIDMap;
        } else
            throw new Error('Invalid Config File');
    }

    /**
     * @method Creates new config file
     */
    private writeConfig() {
        //Generate Ed25519 Keys
        if (!this.publicKey || !this.privateKey) {
            let seed = crypto.randomBytes(32);
            let keyPair = Ed25519.MakeKeypair(seed);
            this.publicKey = keyPair.publicKey;
            this.privateKey = keyPair.privateKey;
        }

        FS.writeFileSync(this.configDir, JSON.stringify({
            CCN: this.CCN,
            pairings: this.pairings,
            publicKey: this.publicKey.toString('hex'),
            privateKey: this.privateKey.toString('hex'),
            UUIDMap: this.UUIDMap
        }), 'utf8');
    }

    /**
     * @method Sets the HAS object which is related to this object
     * @param server
     */
    public setServer(server: HAS) {
        if (this.server)
            throw new Error('Server is already set.');

        this.server = server;
    }

    /**
     * @method Increases the CCN and saves the config file
     */
    public increaseCCN(updateBonjour: boolean = true) {
        this.CCN++;
        if (this.CCN > 4294967295)
            this.CCN = 1;
        if (updateBonjour)
            this.server.updateBonjour();
        this.writeConfig();
    }

    /**
     * @method Creates an object for TXT records which is required for Bonjour
     * @returns {{c#: number, ff: number, id: string, md: string, pv: string, s#: number, sf: number, ci: number}}
     * @look Table 5-7 in HAP Specification
     */
    public getTXTRecords(): object {
        return {
            'c#': this.CCN,
            ff: this.featureFlag,
            id: this.deviceID,
            md: this.deviceName,
            pv: this.protocolVersion,
            's#': this.CSN,
            sf: this.statusFlag,
            ci: this.category
        };
    }

    /**
     * @method Saves a new pairing
     * @param ID
     * @param publicKey
     * @param isAdmin
     */
    public addPairing(ID: Buffer, publicKey: Buffer, isAdmin: boolean) {
        let IDString = ID.toString('utf8');

        if (this.pairings[IDString]) {
            throw new Error('ID already exists.');
        }

        this.pairings[IDString] = {
            publicKey: publicKey.toString('hex'),
            isAdmin: isAdmin
        };

        //Update status flag to avoid new pairings
        if (isAdmin) {
            this.statusFlag = 0x00;
            this.server.updateBonjour();
        }

        this.writeConfig();
    }

    /**
     * @method Removes a pairing
     * @param ID
     */
    public removePairing(ID: Buffer) {
        let IDString = ID.toString('utf8');

        if (!this.pairings[IDString]) {
            throw new Error('ID does NOT exists.');
        }

        delete this.pairings[IDString];

        //Update status flag to make pairing available again
        if (Object.keys(this.pairings).length <= 0) {
            this.statusFlag = 0x01;
            this.server.updateBonjour();
        }

        this.writeConfig();
    }

    /**
     * @method Updates an existing pairing
     * @param ID
     * @param isAdmin
     */
    public updatePairing(ID: Buffer, isAdmin: boolean) {
        let IDString = ID.toString('utf8');

        if (!this.pairings[IDString])
            throw new Error('ID does NOT exists.');

        this.pairings[IDString].isAdmin = isAdmin;

        this.writeConfig();
    }

    /**
     * @method Returns a list of pairings or one specified pairing
     * @param ID
     */
    public getPairings(ID?: Buffer): Pairing | Pairings | boolean {
        if (ID) {
            let IDString = ID.toString('utf8');

            if (!this.pairings[IDString])
                return false;

            return this.pairings[IDString];
        } else
            return this.pairings;
    }

    /**
     * @method Maps UUID to HAS ID
     * @param {string} UUID
     * @returns {number}
     */
    public getHASID(UUID: string): number {
        UUID = UUID.toString().toUpperCase();

        if (this.UUIDMap[UUID])
            return this.UUIDMap[UUID];

        let values = [0];

        for (let UUID in this.UUIDMap)
            values.push(this.UUIDMap[UUID]);

        let lastID = Math.max(...values);
        lastID++;

        this.UUIDMap[UUID] = lastID;
        this.writeConfig();

        return lastID;
    }
}