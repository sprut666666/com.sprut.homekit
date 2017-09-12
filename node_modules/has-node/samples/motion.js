"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HAS = require("../");
var config = new HAS.Config('NodeJS Motion Sensor', '49:E6:B6:63:BC:2C', HAS.categories.sensor, __dirname + '/motion.json', 8095, '200-20-200');
var server = new HAS.Server(config);
var motion = new HAS.Accessory(1);
var motionIdentify = HAS.predefined.Identify(1, undefined, function (value, callback) {
    console.log('Motion Sensor Identify', value);
    callback(HAS.statusCodes.OK);
}), motionManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'), motionModel = HAS.predefined.Model(3, 'Model2017'), motionName = HAS.predefined.Name(4, 'Motion Sensor'), motionSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJKLMNO'), motionFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
motion.addServices(HAS.predefined.AccessoryInformation(1, [motionIdentify, motionManufacturer, motionModel, motionName, motionSerialNumber, motionFirmwareVersion]));
var motionDetected = HAS.predefined.MotionDetected(2, false);
motion.addServices(HAS.predefined.MotionSensor(2, [motionDetected]));
server.addAccessory(motion);
server.onIdentify = motionIdentify.onWrite;
server.startServer();
