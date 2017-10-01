"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HAS = require("../");
var config = new HAS.Config('NodeJS Light', '42:E6:B6:63:BC:2C', HAS.categories.lightBulb, __dirname + '/light.json', 8093, '200-20-200');
var server = new HAS.Server(config);
var light = new HAS.Accessory(1);
var lightIdentify = HAS.predefined.Identify(1, undefined, function (value, callback) {
    console.log('Light Identify', value);
    callback(HAS.statusCodes.OK);
}), lightManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'), lightModel = HAS.predefined.Model(3, 'Model2017'), lightName = HAS.predefined.Name(4, 'Light Bulb'), lightSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJKLM'), lightFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
light.addServices(HAS.predefined.AccessoryInformation(1, [lightIdentify, lightManufacturer, lightModel, lightName, lightSerialNumber, lightFirmwareVersion]));
var on = HAS.predefined.On(1, false, function (value, callback) {
    console.log('Light Status', value);
    callback(HAS.statusCodes.OK);
});
light.addServices(HAS.predefined.Lightbulb(2, [on]));
server.addAccessory(light);
server.onIdentify = lightIdentify.onWrite;
server.startServer();
