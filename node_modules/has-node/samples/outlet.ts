/**
 * @file A simple Homekit outlet sample
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as HAS from '../';

let config = new HAS.Config('NodeJS Outlet', '47:E6:B6:63:BC:2C', HAS.categories.outlet, __dirname + '/outlet.json', 8094, '200-20-200');

let server = new HAS.Server(config);

let outlet = new HAS.Accessory(1);

let outletIdentify = HAS.predefined.Identify(1, undefined, (value, callback) => {
        console.log('Outlet Identify', value);
        callback(HAS.statusCodes.OK);
    }),
    outletManufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'),
    outletModel = HAS.predefined.Model(3, 'Model2017'),
    outletName = HAS.predefined.Name(4, 'Outlet Bulb'),
    outletSerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJKLMN'),
    outletFirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
outlet.addServices(HAS.predefined.AccessoryInformation(1, [outletIdentify, outletManufacturer, outletModel, outletName, outletSerialNumber, outletFirmwareVersion]));


let on = HAS.predefined.On(1, false, (value, callback) => {
    console.log('Outlet Status', value);
    callback(HAS.statusCodes.OK);
});
let inUse = HAS.predefined.OutletInUse(2, false);
outlet.addServices(HAS.predefined.Outlet(2, [on, inUse]));

server.addAccessory(outlet);

//server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = outletIdentify.onWrite;

//Starts the server
server.startServer();