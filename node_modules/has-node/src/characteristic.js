"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var values_1 = require("./TLV/values");
var Characteristic = (function () {
    function Characteristic(ID, type, valueFormat, isHidden, hasNotifications, hasValue, isReadonly, additionalAuthorization, valueUnit, description, minValue, maxValue, stepValue, maxLength, validValues, validRangeValues, silentNotifications) {
        this.subscribers = [];
        this.ID = ID;
        this.type = type;
        this.valueFormat = valueFormat;
        this.valueUnit = valueUnit;
        this.description = description;
        if (this.isNumeric()) {
            this.minValue = minValue;
            this.maxValue = maxValue;
            this.stepValue = stepValue;
            this.validValues = validValues;
            this.validRangeValues = validRangeValues;
        }
        if (this.hasLength())
            this.maxLength = maxLength;
        if (this.maxLength && this.maxLength > 256 && !this.isBuffer())
            this.maxLength = 256;
        this.isHidden = isHidden;
        this.hasNotifications = hasNotifications;
        this.hasValue = hasValue;
        this.isReadonly = isReadonly;
        this.additionalAuthorization = additionalAuthorization;
        this.silentNotifications = silentNotifications;
    }
    Characteristic.prototype.getID = function () {
        return this.ID;
    };
    Characteristic.prototype.getType = function () {
        return this.type;
    };
    Characteristic.prototype.getHasValue = function () {
        return this.hasValue;
    };
    Characteristic.prototype.getHasNotifications = function () {
        return this.hasNotifications;
    };
    Characteristic.prototype.getIsReadonly = function () {
        return this.isReadonly;
    };
    Characteristic.prototype.isNumeric = function () {
        if (!this.valueFormat)
            return false;
        return ['uint8', 'uint16', 'uint32', 'int', 'float'].indexOf(this.valueFormat) > -1;
    };
    Characteristic.prototype.hasLength = function () {
        if (!this.valueFormat)
            return false;
        return ['string', 'tlv8', 'data'].indexOf(this.valueFormat) > -1;
    };
    Characteristic.prototype.isBuffer = function () {
        if (!this.valueFormat)
            return false;
        return ['tlv8', 'data'].indexOf(this.valueFormat) > -1;
    };
    Characteristic.prototype.setValue = function (value, checkValue) {
        if (checkValue === void 0) { checkValue = true; }
        if (!this.hasValue)
            return;
        if (value === this.value)
            return;
        if (!checkValue || this.isValid(value)) {
            this.value = value;
            if (this.hasNotifications && this.subscribers.length && this.service && this.service.getAccessory() && this.service.getAccessory().getServer()) {
                this.subscribers = this.service.getAccessory().getServer().TCPServer.sendNotification(this.subscribers, JSON.stringify({
                    characteristics: [{
                            aid: this.service.getAccessory().getID(),
                            iid: this.service.getAccessory().getIID(this.service.getID(), this.ID),
                            value: this.value
                        }]
                }));
            }
        }
        else
            throw new Error('Invalid Value: ' + value.toString());
    };
    Characteristic.prototype.getValue = function () {
        return this.value;
    };
    Characteristic.prototype.setService = function (service) {
        if (this.service)
            throw new Error('Service is already set.');
        this.service = service;
    };
    Characteristic.prototype.subscribe = function (socketID) {
        if (!this.hasNotifications)
            return;
        if (this.subscribers.indexOf(socketID) <= -1)
            this.subscribers.push(socketID);
    };
    Characteristic.prototype.unsubscribe = function (socketID) {
        if (!this.hasNotifications)
            return;
        this.subscribers.splice(this.subscribers.indexOf(socketID), 1);
    };
    Characteristic.prototype.isValid = function (value) {
        if (value === null || value === undefined)
            return false;
        if (this.isNumeric()) {
            if (this.minValue && value < this.minValue)
                return false;
            if (this.maxValue && value > this.maxValue)
                return false;
            if (this.validValues && this.validValues.indexOf(value) <= -1)
                return false;
            if (this.validRangeValues && (this.value < this.validRangeValues[0] || this.value > this.validRangeValues[1]))
                return false;
        }
        else {
            if (this.isBuffer() && !Buffer.isBuffer(value))
                return false;
            if (this.maxLength && value.length > this.maxLength)
                return false;
        }
        return true;
    };
    Characteristic.prototype.writeValue = function (value, authData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isValid(value)) {
                if (_this.isReadonly) {
                    reject(values_1.statusCodes.isReadonly);
                    return;
                }
                if (_this.isNumeric())
                    value = parseFloat(value);
                else if (_this.valueFormat == 'bool')
                    value = value == 1;
                else if (_this.isBuffer())
                    value = Buffer.from(value, 'base64');
                else
                    value = value.toString();
                if (_this.onWrite) {
                    var timeout_1 = setTimeout(function () {
                        reject(values_1.statusCodes.timedout);
                    }, 10000);
                    _this.onWrite(value, function (status) {
                        clearTimeout(timeout_1);
                        if (status == values_1.statusCodes.OK) {
                            if (_this.hasValue)
                                _this.setValue(value, false);
                            resolve(values_1.statusCodes.OK);
                        }
                        else
                            reject(status);
                    }, _this.additionalAuthorization ? Buffer.from(authData, 'base64') : undefined);
                }
                else {
                    if (_this.hasValue) {
                        _this.setValue(value, false);
                        resolve(values_1.statusCodes.OK);
                    }
                    else
                        reject(values_1.statusCodes.communicationError);
                }
            }
            else
                reject(values_1.statusCodes.invalidValue);
        });
    };
    Characteristic.prototype.getPermissions = function () {
        var permissions = [];
        if (this.hasValue)
            permissions.push('pr');
        if (!this.isReadonly)
            permissions.push('pw');
        if (this.hasNotifications)
            permissions.push('ev');
        if (this.additionalAuthorization)
            permissions.push('aa');
        if (this.isHidden)
            permissions.push('hd');
        return permissions;
    };
    Characteristic.prototype.getMetadata = function () {
        var object = {};
        object['format'] = this.valueFormat;
        if (this.valueUnit)
            object['unit'] = this.valueUnit;
        if (this.minValue)
            object['minValue'] = this.minValue;
        if (this.maxValue)
            object['maxValue'] = this.maxValue;
        if (this.stepValue)
            object['minStep'] = this.stepValue;
        if (this.maxLength)
            object[this.isBuffer() ? 'maxDataLen' : 'maxLen'] = this.maxLength;
        if (this.validValues)
            object['valid-values'] = this.validValues;
        if (this.validRangeValues)
            object['valid-values-range'] = this.validRangeValues;
        return object;
    };
    Characteristic.prototype.addMetadata = function (object) {
        var metadata = this.getMetadata();
        for (var index in metadata)
            object[index] = metadata[index];
    };
    Characteristic.prototype.toJSON = function () {
        var value;
        if (this.hasValue && this.value != undefined) {
            if (this.isNumeric())
                value = parseFloat(this.value);
            else if (this.valueFormat == 'bool')
                value = this.value == 1;
            else if (this.isBuffer())
                value = this.value.toString('base64');
            else
                value = this.value.toString();
        }
        else
            value = null;
        var object = {
            type: this.type,
            iid: this.ID,
            perms: this.getPermissions(),
        };
        if (value !== null && value !== undefined)
            object['value'] = value;
        if (this.hasNotifications && !this.silentNotifications)
            object['ev'] = true;
        if (this.description)
            object['description'] = this.description;
        this.addMetadata(object);
        return object;
    };
    return Characteristic;
}());
exports.default = Characteristic;
