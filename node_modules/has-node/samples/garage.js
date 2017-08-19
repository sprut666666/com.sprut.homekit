"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HAS = require("../");
var config = new HAS.Config('NodeJS Garage Door', '83:E9:B6:63:BC:2C', HAS.categories.garage, __dirname + '/garage.json', 8092, '200-20-200');
var server = new HAS.Server(config);
var garage = new HAS.Accessory(1);
var Identify = HAS.predefined.Identify(1, undefined, function (value, callback) {
    console.log('Garage Identify', value);
    callback(HAS.statusCodes.OK);
}), Manufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'), Model = HAS.predefined.Model(3, 'Model2017'), Name = HAS.predefined.Name(4, 'Garage Door'), SerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJK'), FirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
garage.addServices(HAS.predefined.AccessoryInformation(1, [Identify, Manufacturer, Model, Name, SerialNumber, FirmwareVersion]));
var current = HAS.predefined.CurrentDoorState(1, 1);
var target = HAS.predefined.TargetDoorState(2, 0, function (value, callback) {
    console.log('Door State', value);
    setTimeout(function () {
        current.setValue(value);
    }, 5000);
    callback(HAS.statusCodes.OK);
});
var obstruction = HAS.predefined.ObstructionDetected(3, 0);
garage.addServices(HAS.predefined.GarageDoorOpener(2, [current, target, obstruction]));
server.addAccessory(garage);
server.onIdentify = Identify.onWrite;
server.startServer();
