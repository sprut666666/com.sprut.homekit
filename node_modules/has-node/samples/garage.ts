/**
 * @file A simple Homekit garage door sample
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as HAS from '../';

const config = new HAS.Config('Garage Door', '88:E9:B6:63:BC:2C', HAS.categories.garage, __dirname + '/garage.json', 8092, '200-20-200');

const server = new HAS.Server(config);

// Garage
const garage = new HAS.Accessory(1);

const Identify = HAS.predefined.Identify(1, undefined, (value, callback) => {
        console.log('Garage Identify', value);
        callback(HAS.statusCodes.OK);
    }),
    Manufacturer = HAS.predefined.Manufacturer(2, 'Hamyar'),
    Model = HAS.predefined.Model(3, 'Model2017'),
    Name = HAS.predefined.Name(4, 'Garage Door'),
    SerialNumber = HAS.predefined.SerialNumber(5, 'ABCDEFGHIJK'),
    FirmwareVersion = HAS.predefined.FirmwareRevision(6, '1.0.0');
garage.addServices(HAS.predefined.AccessoryInformation(1, [Identify, Manufacturer, Model, Name, SerialNumber, FirmwareVersion]));


const current = HAS.predefined.CurrentDoorState(1, 1);
const target = HAS.predefined.TargetDoorState(2, 0, (value, callback) => {
    console.log('Door State', value);
    setTimeout(() => {
        current.setValue(value);
    }, 5000);
    callback(HAS.statusCodes.OK);
});
const obstruction = HAS.predefined.ObstructionDetected(3, 0);
garage.addServices(HAS.predefined.GarageDoorOpener(2, [current, target, obstruction]));

server.addAccessory(garage);

// server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = Identify.onWrite;

// Starts the server
server.startServer();