"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service = (function () {
    function Service(ID, type, isHidden, isPrimary, linkedServices) {
        this.characteristics = {};
        this.isPrimary = false;
        this.isHidden = false;
        this.linkedServices = [];
        this.ID = ID;
        this.type = type;
        this.isPrimary = isPrimary;
        this.isHidden = isHidden;
        this.linkedServices = linkedServices;
    }
    Service.prototype.getID = function () {
        return this.ID;
    };
    Service.prototype.getCharacteristics = function () {
        return this.characteristics;
    };
    Service.prototype.setAccessory = function (accessory) {
        if (this.accessory)
            throw new Error('Accessory is already set.');
        this.accessory = accessory;
    };
    Service.prototype.getAccessory = function () {
        return this.accessory;
    };
    Service.prototype.getIsPrimary = function () {
        return this.isPrimary;
    };
    Service.prototype.getLinkedServices = function () {
        return this.linkedServices;
    };
    Service.prototype.addCharacteristic = function (characteristic) {
        var characteristicID = characteristic.getID();
        if (this.accessory)
            throw new Error('Accessory is already set: ' + characteristicID);
        if (Object.keys(this.characteristics).length >= 100)
            throw new Error('Service can not have more than 100 characteristics: ' + characteristicID);
        if (characteristicID < 1 || characteristicID > 999)
            throw new Error('Characteristic ID can not be less than 1 or more than 999: ' + characteristicID);
        for (var index in this.characteristics) {
            if (this.characteristics[index].getType() == characteristic.getType())
                throw new Error('Characteristic type already exists: ' + characteristicID + ' ' + characteristic.getType());
        }
        if (this.characteristics[characteristicID])
            throw new Error('Characteristic ID already exists: ' + characteristicID);
        this.characteristics[characteristicID] = characteristic;
        characteristic.setService(this);
    };
    Service.prototype.addCharacteristics = function () {
        var characteristics = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            characteristics[_i] = arguments[_i];
        }
        for (var _a = 0, characteristics_1 = characteristics; _a < characteristics_1.length; _a++) {
            var characteristic = characteristics_1[_a];
            this.addCharacteristic(characteristic);
        }
    };
    Service.prototype.toJSON = function () {
        var characteristics = [];
        for (var index in this.characteristics)
            characteristics.push(this.characteristics[index].toJSON());
        var object = {
            type: this.type,
            iid: this.ID,
            characteristics: characteristics
        };
        if (this.isHidden)
            object['hidden'] = true;
        if (this.isPrimary)
            object['primary'] = true;
        if (this.linkedServices.length)
            object['linked'] = this.linkedServices;
        return object;
    };
    return Service;
}());
exports.default = Service;
