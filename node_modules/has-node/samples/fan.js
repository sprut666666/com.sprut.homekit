"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HAS = require("../");
var config = new HAS.Config('NodeJS Fan', '82:E6:B6:63:BC:2C', HAS.categories.fan, __dirname + '/fan.json', 8091, '200-20-200');
var server = new HAS.Server(config);
var fan = new HAS.Accessory(1);
var fanIdentify = HAS.predefined.Identify(1, undefined, function (value, callback) {
    console.log('Fan Identify', value);
    callback(HAS.statusCodes.OK);
}), fanManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'), fanModel = HAS.predefined.Model(3, 'Model2017'), fanName = HAS.predefined.Name(4, 'Fan'), fanSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJ'), fanFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
fan.addServices(HAS.predefined.AccessoryInformation(1, [fanIdentify, fanManufacturer, fanModel, fanName, fanSerialNumber, fanFirmwareVersion]));
var on = HAS.predefined.On(1, false, function (value, callback) {
    console.log('Fan Status', value);
    callback(HAS.statusCodes.OK);
});
fan.addServices(HAS.predefined.Fan(2, [on]));
server.addAccessory(fan);
server.onIdentify = fanIdentify.onWrite;
server.startServer();
