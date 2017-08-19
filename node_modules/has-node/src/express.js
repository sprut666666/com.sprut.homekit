"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var TLVEnums = require("./TLV/values");
var parse_1 = require("./TLV/parse");
var encode_1 = require("./TLV/encode");
var SRP_1 = require("./encryption/SRP");
var HKDF_1 = require("./encryption/HKDF");
var ChaCha = require("./encryption/ChaCha20Poly1305AEAD");
var Ed25519 = require('ed25519');
var Curve25519 = require('curve25519-n2');
function default_1(server) {
    var _this = this;
    var app = express();
    app.use(function (req, res, next) {
        req.socket.setTimeout(0);
        req.socket.setKeepAlive(true, 1800000);
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
            var data_1 = Buffer.alloc(0);
            req.on('data', function (chunk) {
                data_1 = Buffer.concat([data_1, chunk]);
            });
            req.on('end', function () {
                req.body = req.body || {};
                req.body.TLV = parse_1.default(data_1);
                next();
            });
        }
        else
            next();
    });
    app.use(bodyParser.json({
        type: 'application/hap+json'
    }));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.post('/pair-setup', function (req, res) {
        res.header('Content-Type', 'application/pairing+tlv8');
        var currentState = (req.body.TLV[TLVEnums.TLVValues.state]) ? parseInt(req.body.TLV[TLVEnums.TLVValues.state].toString('hex')) : 0x00;
        try {
            if (server.config.statusFlag != 0x01) {
                res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unavailable, currentState));
                return;
            }
            if (server.config.failedAuthCounter > 100) {
                res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.maxTries, currentState));
                return;
            }
            if (currentState === 0x01) {
                if (server.config.lastPairStepTime && new Date().getTime() - server.config.lastPairStepTime.getTime() < 30000 && server.config.SRP && server.config.SRP.socketID !== req.realSocket.ID) {
                    res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.busy, currentState));
                    return;
                }
                server.config.lastPairStepTime = new Date();
                server.config.SRP = new SRP_1.default(server.config.setupCode);
                server.config.SRP.socketID = req.realSocket.ID;
                res.end(encode_1.encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }, {
                        key: TLVEnums.TLVValues.publicKey,
                        value: server.config.SRP.getPublicKey()
                    }, {
                        key: TLVEnums.TLVValues.salt,
                        value: server.config.SRP.salt
                    }
                ]));
                return;
            }
            server.config.lastPairStepTime = new Date();
            if (!server.config.SRP) {
                res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
                return;
            }
            if (currentState === 0x03) {
                server.config.SRP.setClientPublicKey(req.body.TLV[TLVEnums.TLVValues.publicKey]);
                if (server.config.SRP.checkClientProof(req.body.TLV[TLVEnums.TLVValues.proof])) {
                    res.end(encode_1.encodeTLV([
                        {
                            key: TLVEnums.TLVValues.state,
                            value: currentState + 1
                        }, {
                            key: TLVEnums.TLVValues.proof,
                            value: server.config.SRP.getM2Proof()
                        }
                    ]));
                    return;
                }
                else {
                    server.config.lastPairStepTime = undefined;
                    res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                }
                return;
            }
            if (currentState === 0x05) {
                var body = req.body.TLV[TLVEnums.TLVValues.encryptedData], encryptedData = body.slice(0, body.length - 16), tag = body.slice(body.length - 16), key = HKDF_1.default(server.config.SRP.getSessionKey());
                var data = ChaCha.decrypt(key, 'PS-Msg05', tag, encryptedData);
                if (data === false)
                    res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                else {
                    var info = parse_1.default(data);
                    var iOSDeviceInfo = Buffer.concat([HKDF_1.default(server.config.SRP.getSessionKey(), 'Pair-Setup-Controller-Sign-Salt', 'Pair-Setup-Controller-Sign-Info'), info[TLVEnums.TLVValues.identifier], info[TLVEnums.TLVValues.publicKey]]);
                    if (Ed25519.Verify(iOSDeviceInfo, info[TLVEnums.TLVValues.signature], info[TLVEnums.TLVValues.publicKey])) {
                        server.config.addPairing(info[TLVEnums.TLVValues.identifier], info[TLVEnums.TLVValues.publicKey], true);
                        var accessoryInfo = Buffer.concat([HKDF_1.default(server.config.SRP.getSessionKey(), 'Pair-Setup-Accessory-Sign-Salt', 'Pair-Setup-Accessory-Sign-Info'), Buffer.from(server.config.deviceID), server.config.publicKey]);
                        var accessorySignature = Ed25519.Sign(accessoryInfo, server.config.privateKey);
                        var plainTLV = encode_1.encodeTLV([
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
                        res.end(encode_1.encodeTLV([
                            {
                                key: TLVEnums.TLVValues.state,
                                value: currentState + 1
                            }, {
                                key: TLVEnums.TLVValues.encryptedData,
                                value: ChaCha.encrypt(key, 'PS-Msg06', plainTLV)
                            }
                        ]));
                    }
                    else
                        res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                }
                return;
            }
        }
        catch (e) {
            console.error(e);
            server.config.lastPairStepTime = undefined;
            res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
        }
    });
    app.post('/pair-verify', function (req, res) {
        res.header('Content-Type', 'application/pairing+tlv8');
        var currentState = (req.body.TLV[TLVEnums.TLVValues.state]) ? parseInt(req.body.TLV[TLVEnums.TLVValues.state].toString('hex')) : 0x00;
        try {
            if (currentState === 0x01) {
                var secretKey = Buffer.alloc(32);
                secretKey = Curve25519.makeSecretKey(secretKey);
                var publicKey = Curve25519.derivePublicKey(secretKey), sharedKey = Curve25519.deriveSharedSecret(secretKey, req.body.TLV[TLVEnums.TLVValues.publicKey]);
                var accessoryInfo = Buffer.concat([publicKey, Buffer.from(server.config.deviceID), req.body.TLV[TLVEnums.TLVValues.publicKey]]);
                var accessorySignature = Ed25519.Sign(accessoryInfo, server.config.privateKey);
                var plainTLV = encode_1.encodeTLV([
                    {
                        key: TLVEnums.TLVValues.identifier,
                        value: server.config.deviceID
                    },
                    {
                        key: TLVEnums.TLVValues.signature,
                        value: accessorySignature
                    }
                ]);
                var sessionKey = HKDF_1.default(sharedKey, 'Pair-Verify-Encrypt-Salt', 'Pair-Verify-Encrypt-Info');
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
                res.end(encode_1.encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }, {
                        key: TLVEnums.TLVValues.encryptedData,
                        value: ChaCha.encrypt(sessionKey, 'PV-Msg02', plainTLV)
                    }, {
                        key: TLVEnums.TLVValues.publicKey,
                        value: publicKey
                    }
                ]));
                return;
            }
            if (!req.realSocket.HAPEncryption) {
                res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
                return;
            }
            if (currentState === 0x03) {
                var body = req.body.TLV[TLVEnums.TLVValues.encryptedData], encryptedData = body.slice(0, body.length - 16), tag = body.slice(body.length - 16);
                var data = ChaCha.decrypt(req.realSocket.HAPEncryption.sessionKey, 'PV-Msg03', tag, encryptedData);
                if (data === false)
                    res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                else {
                    var info = parse_1.default(data);
                    var pairing = server.config.getPairings(info[TLVEnums.TLVValues.identifier]);
                    if (pairing === false)
                        res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                    else {
                        pairing = pairing;
                        var iOSDeviceInfo = Buffer.concat([req.realSocket.HAPEncryption.clientPublicKey, info[TLVEnums.TLVValues.identifier], req.realSocket.HAPEncryption.serverPublicKey]);
                        if (Ed25519.Verify(iOSDeviceInfo, info[TLVEnums.TLVValues.signature], Buffer.from(pairing.publicKey, 'hex'))) {
                            req.realSocket.HAPEncryption.accessoryToControllerKey = HKDF_1.default(req.realSocket.HAPEncryption.sharedKey, 'Control-Salt', 'Control-Read-Encryption-Key');
                            req.realSocket.HAPEncryption.controllerToAccessoryKey = HKDF_1.default(req.realSocket.HAPEncryption.sharedKey, 'Control-Salt', 'Control-Write-Encryption-Key');
                            req.realSocket.HAPEncryption.isAdmin = pairing.isAdmin;
                            req.realSocket.isEncrypted = true;
                            req.realSocket.isAuthenticated = true;
                            req.realSocket.clientID = info[TLVEnums.TLVValues.identifier].toString('utf8');
                            req.realSocket.keepAliveForEver();
                            res.end(encode_1.encodeTLV([
                                {
                                    key: TLVEnums.TLVValues.state,
                                    value: currentState + 1
                                }
                            ]));
                        }
                        else
                            res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
                    }
                }
                return;
            }
        }
        catch (e) {
            console.error(e);
            res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
        }
    });
    app.get('/accessories', function (req, res) {
        res.header('Content-Type', 'application/hap+json');
        if (!req.realSocket.isAuthenticated) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }
        var accessoriesObject = server.getAccessories(), accessories = [];
        for (var index in accessoriesObject)
            accessories.push(accessoriesObject[index].toJSON());
        res.end(JSON.stringify({
            accessories: accessories
        }));
    });
    app.post('/pairings', function (req, res) {
        res.header('Content-Type', 'application/pairing+tlv8');
        var currentState = (req.body.TLV[TLVEnums.TLVValues.state]) ? parseInt(req.body.TLV[TLVEnums.TLVValues.state].toString('hex')) : 0x00;
        if (!req.realSocket.isAuthenticated || !req.realSocket.HAPEncryption.isAdmin) {
            res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
            return;
        }
        if (req.body.TLV[TLVEnums.TLVValues.method].toString('hex') == TLVEnums.TLVMethods.addPairing) {
            var pairing = server.config.getPairings(req.body.TLV[TLVEnums.TLVValues.identifier]);
            if (pairing === false) {
                server.config.addPairing(req.body.TLV[TLVEnums.TLVValues.identifier], req.body.TLV[TLVEnums.TLVValues.publicKey], req.body.TLV[TLVEnums.TLVValues.permissions].toString('hex') == '01');
                res.end(encode_1.encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }
                ]));
            }
            else {
                pairing = pairing;
                if (pairing.publicKey == req.body.TLV[TLVEnums.TLVValues.publicKey].toString('hex')) {
                    server.config.updatePairing(req.body.TLV[TLVEnums.TLVValues.identifier], req.body.TLV[TLVEnums.TLVValues.permissions].toString('hex') == '01');
                    res.end(encode_1.encodeTLV([
                        {
                            key: TLVEnums.TLVValues.state,
                            value: currentState + 1
                        }
                    ]));
                }
                else
                    res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
            }
        }
        else if (req.body.TLV[TLVEnums.TLVValues.method].toString('hex') == TLVEnums.TLVMethods.removePairing) {
            var pairing = server.config.getPairings(req.body.TLV[TLVEnums.TLVValues.identifier]);
            if (pairing === false)
                res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.unknown, currentState));
            else {
                server.config.removePairing(req.body.TLV[TLVEnums.TLVValues.identifier]);
                res.end(encode_1.encodeTLV([
                    {
                        key: TLVEnums.TLVValues.state,
                        value: currentState + 1
                    }
                ]));
                server.TCPServer.revokeConnections(req.body.TLV[TLVEnums.TLVValues.identifier].toString('utf8'));
            }
        }
        else
            res.end();
    });
    app.get('/pairings', function (req, res) {
        console.log(req.body, req.realSocket.ID);
        res.header('Content-Type', 'application/pairing+tlv8');
        var currentState = 1;
        if (!req.realSocket.isAuthenticated || !req.realSocket.HAPEncryption.isAdmin) {
            res.end(encode_1.encodeTLVError(TLVEnums.TLVErrors.authentication, currentState));
            return;
        }
        var pairings = server.config.getPairings(), response = [{
                key: TLVEnums.TLVValues.state,
                value: currentState + 1
            }], offset = 0, total = Object.keys(pairings).length;
        for (var index in pairings) {
            var pairing = pairings[index];
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
    app.get('/characteristics', function (req, res) {
        res.header('Content-Type', 'application/hap+json');
        if (!req.realSocket.isAuthenticated) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }
        var characteristics2Read = req.query.id.split(',');
        var characteristics = [], allOK = true;
        for (var _i = 0, characteristics2Read_1 = characteristics2Read; _i < characteristics2Read_1.length; _i++) {
            var characteristic = characteristics2Read_1[_i];
            characteristic = characteristic.split('.');
            var accessoryID = parseInt(characteristic[0]), characteristicID = parseInt(characteristic[1]);
            var object = {
                aid: accessoryID,
                iid: characteristicID
            };
            var accessory = server.getAccessories()[accessoryID], error = null, value = null;
            if (accessory) {
                var characteristic_1 = accessory.getCharacteristic(characteristicID);
                if (characteristic_1) {
                    characteristic_1 = characteristic_1;
                    if (characteristic_1.getHasValue())
                        value = characteristic_1.getValue();
                    else
                        error = TLVEnums.statusCodes.isWriteonly;
                    if (req.query.meta)
                        characteristic_1.addMetadata(object);
                    if (req.query.perms)
                        object['perms'] = characteristic_1.getPermissions();
                    if (req.query.type)
                        object['type'] = characteristic_1.getType();
                    if (req.query.ev)
                        object['ev'] = characteristic_1.getHasNotifications();
                }
                else
                    error = TLVEnums.statusCodes.notFound;
            }
            else
                error = TLVEnums.statusCodes.notFound;
            if (error) {
                object['status'] = error;
                allOK = false;
            }
            else {
                object['value'] = value;
                object['status'] = TLVEnums.statusCodes.OK;
            }
            characteristics.push(object);
        }
        if (allOK) {
            for (var _a = 0, characteristics_1 = characteristics; _a < characteristics_1.length; _a++) {
                var characteristic = characteristics_1[_a];
                delete characteristic['status'];
            }
        }
        res.status(allOK ? 200 : 207).end(JSON.stringify({
            characteristics: characteristics
        }));
    });
    app.put('/characteristics', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var characteristics, allOK;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.header('Content-Type', 'application/hap+json');
                    if (!req.realSocket.isAuthenticated) {
                        res.status(400).end(JSON.stringify({
                            status: TLVEnums.statusCodes.insufficientPrivilege
                        }));
                        return [2];
                    }
                    characteristics = [], allOK = true;
                    return [4, Promise.all(req.body.characteristics.map(function (characteristic) { return __awaiter(_this, void 0, void 0, function () {
                            var accessoryID, characteristicID, value, event, authData, accessory, error, characteristic_2, e_1, object;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        accessoryID = parseInt(characteristic.aid), characteristicID = parseInt(characteristic.iid), value = characteristic.value, event = characteristic.ev, authData = characteristic.authData;
                                        accessory = server.getAccessories()[accessoryID], error = null;
                                        if (!accessory) return [3, 7];
                                        characteristic_2 = accessory.getCharacteristic(characteristicID);
                                        if (!characteristic_2) return [3, 5];
                                        characteristic_2 = characteristic_2;
                                        if (event && !characteristic_2.getHasNotifications())
                                            error = TLVEnums.statusCodes.notificationIsNotSupported;
                                        if (!!error) return [3, 4];
                                        if (event)
                                            characteristic_2.subscribe(req.realSocket.ID);
                                        if (event === false)
                                            characteristic_2.unsubscribe(req.realSocket.ID);
                                        if (!(value != null && value != undefined)) return [3, 4];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, characteristic_2.writeValue(value, authData)];
                                    case 2:
                                        _a.sent();
                                        return [3, 4];
                                    case 3:
                                        e_1 = _a.sent();
                                        error = e_1;
                                        return [3, 4];
                                    case 4: return [3, 6];
                                    case 5:
                                        error = TLVEnums.statusCodes.notFound;
                                        _a.label = 6;
                                    case 6: return [3, 8];
                                    case 7:
                                        error = TLVEnums.statusCodes.notFound;
                                        _a.label = 8;
                                    case 8:
                                        object = {
                                            aid: accessoryID,
                                            iid: characteristicID
                                        };
                                        if (error) {
                                            object['status'] = error;
                                            allOK = false;
                                        }
                                        else
                                            object['status'] = TLVEnums.statusCodes.OK;
                                        characteristics.push(object);
                                        return [2];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    if (allOK)
                        res.removeHeader('Content-Type');
                    res.status(allOK ? 204 : 207).end(allOK ? null : JSON.stringify({
                        characteristics: characteristics
                    }));
                    return [2];
            }
        });
    }); });
    app.get('/identify', function (req, res) {
        res.header('Content-Type', 'application/hap+json');
        if (server.config.statusFlag != 0x01) {
            res.status(400).end(JSON.stringify({
                status: TLVEnums.statusCodes.insufficientPrivilege
            }));
            return;
        }
        if (server.onIdentify) {
            server.onIdentify(true, function (status) {
                if (status == TLVEnums.statusCodes.OK) {
                    res.removeHeader('Content-Type');
                    res.status(204).end();
                }
                else
                    res.status(500).end(JSON.stringify({
                        status: status
                    }));
            });
        }
        else
            res.status(500).end(JSON.stringify({
                status: TLVEnums.statusCodes.communicationError
            }));
    });
    return app;
}
exports.default = default_1;
;
