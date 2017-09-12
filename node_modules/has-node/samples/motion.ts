/**
 * @file A simple Homekit motion sample
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as HAS from '../';

let config = new HAS.Config('NodeJS Motion Sensor', '49:E6:B6:63:BC:2C', HAS.categories.sensor, __dirname + '/motion.json', 8095, '200-20-200');

let server = new HAS.Server(config);

let motion = new HAS.Accessory(1);

let motionIdentify = HAS.predefined.Identify(1, undefined, (value, callback) => {
        console.log('Motion Sensor Identify', value);
        callback(HAS.statusCodes.OK);
    }),
    motionManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'),
    motionModel = HAS.predefined.Model(3, 'Model2017'),
    motionName = HAS.predefined.Name(4, 'Motion Sensor'),
    motionSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJKLMNO'),
    motionFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
motion.addServices(HAS.predefined.AccessoryInformation(1, [motionIdentify, motionManufacturer, motionModel, motionName, motionSerialNumber, motionFirmwareVersion]));


let motionDetected = HAS.predefined.MotionDetected(2, false);
motion.addServices(HAS.predefined.MotionSensor(2, [motionDetected]));

server.addAccessory(motion);

//server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = motionIdentify.onWrite;

//Starts the server
server.startServer();