/**
 * @file A simple Homekit bridge sample
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as HAS from '../';

let config = new HAS.Config('NodeJS Bridge2', '81:E6:B6:43:BC:2C', HAS.categories.bridge, __dirname + '/bridge.json', 8090, '200-20-200');

let server = new HAS.Server(config);

//Bridge
let bridge = new HAS.Accessory(1);

let identify = HAS.predefined.Identify(1, undefined, (value, callback) => {
        console.log('Bridge Identify', value);
        callback(HAS.statusCodes.OK);
    }),
    manufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'),
    model = HAS.predefined.Model(3, 'Model2017'),
    name = HAS.predefined.Name(4, 'Bridge'),
    serialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGH'),
    firmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
bridge.addServices(HAS.predefined.AccessoryInformation(1, [identify, manufacturer, model, name, serialNumber, firmwareVersion]));

server.addAccessory(bridge);

//server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = identify.onWrite;

//Fan
let fan = new HAS.Accessory(2);

let fanIdentify = HAS.predefined.Identify(1, undefined, (value, callback) => {
        console.log('Fan Identify', value);
        callback(HAS.statusCodes.OK);
    }),
    fanManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'),
    fanModel = HAS.predefined.Model(3, 'Model2017'),
    fanName = HAS.predefined.Name(4, 'Fan'),
    fanSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJ'),
    fanFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
fan.addServices(HAS.predefined.AccessoryInformation(1, [fanIdentify, fanManufacturer, fanModel, fanName, fanSerialNumber, fanFirmwareVersion]));


let on = HAS.predefined.On(1, false, (value, callback) => {
    console.log('Fan Status', value);
    callback(HAS.statusCodes.OK);
});
fan.addServices(HAS.predefined.Fan(2, [on]));

server.addAccessory(fan);

//Starts the server
server.startServer();