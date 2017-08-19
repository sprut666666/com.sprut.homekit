/**
 * @file A simple Homekit light bulb sample
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as HAS from '../';

let config = new HAS.Config('NodeJS Light', '42:E6:B6:63:BC:2C', HAS.categories.lightBulb, __dirname + '/light.json', 8093, '200-20-200');

let server = new HAS.Server(config);

let light = new HAS.Accessory(1);

let lightIdentify = HAS.predefined.Identify(1, undefined, (value, callback) => {
        console.log('Light Identify', value);
        callback(HAS.statusCodes.OK);
    }),
    lightManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'),
    lightModel = HAS.predefined.Model(3, 'Model2017'),
    lightName = HAS.predefined.Name(4, 'Light Bulb'),
    lightSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJKLM'),
    lightFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
light.addServices(HAS.predefined.AccessoryInformation(1, [lightIdentify, lightManufacturer, lightModel, lightName, lightSerialNumber, lightFirmwareVersion]));


let on = HAS.predefined.On(1, false, (value, callback) => {
    console.log('Light Status', value);
    callback(HAS.statusCodes.OK);
});
light.addServices(HAS.predefined.Lightbulb(2, [on]));

server.addAccessory(light);

//server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = lightIdentify.onWrite;

//Starts the server
server.startServer();