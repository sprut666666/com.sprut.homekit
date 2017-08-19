/**
 * @file A simple Homekit fan+temperatureSensor sample
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as HAS from '../';

let config = new HAS.Config('NodeJS Fan+TemperatureSensor', '83:E6:B6:63:BC:2C', HAS.categories.fan, __dirname + '/fan+temperatureSensor.json', 8097, '200-20-200');

let server = new HAS.Server(config);


//Fan
let fan = new HAS.Accessory(1);

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


let temperature = HAS.predefined.CurrentTemperature(1, 30.00);
fan.addServices(HAS.predefined.TemperatureSensor(2, [temperature]));

setInterval(() => {
    temperature.setValue(temperature.getValue() + 1);
}, 7000);

let on = HAS.predefined.On(1, false, (value, callback) => {
    console.log('Fan Status', value);
    callback(HAS.statusCodes.OK);
});
fan.addServices(HAS.predefined.Fan(3, [on], false, true, [2]));


server.addAccessory(fan);

//server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = fanIdentify.onWrite;

//Starts the server
server.startServer();