# HAS
### Homekit Accessory Server

[![npm version](https://badge.fury.io/js/has-node.svg)](https://badge.fury.io/js/has-node)

HAS is a Homekit accessory server written in NodeJS which lets you create your own Homekit-enabled accessories on your computer, Raspberry Pi or everything else which can run NodeJS.

It provides you a rich and simple API to create your own servers, accessories, services and characteristic.

This project is based on Homekit accessory protocol(HAP) specification which you can find it [here](https://developer.apple.com/homekit/specification/)(Requires Apple developer account).

# Installation

```
npm install has-node 
```

# Sample

```js
import * as HAS from 'has-node';

let config = new HAS.Config('NodeJS Fan', '82:E6:B6:63:BC:2C', HAS.categories.fan, __dirname + '/fan.json', 8091, '200-20-200');

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


let on = HAS.predefined.On(1, false, (value, callback) => {
    console.log('Fan Status', value);
    callback(HAS.statusCodes.OK);
});
fan.addServices(HAS.predefined.Fan(2, [on]));

server.addAccessory(fan);

//server.onIdentify will be used only when server is not paired, If server is paired identify.onWrite will be used
server.onIdentify = fanIdentify.onWrite;

//Starts the server
server.startServer();
```

_Check out [samples folder](https://github.com/abedinpour/HAS/tree/master/samples) for more samples._

# API

**Categories**

Homekit Accessory Categories

```js
HAS.catogories = {
   other: 1,
   bridge: 2,
   fan: 3,
   garage: 4,
   lightBulb: 5,
   doorLock: 6,
   outlet: 7,
   switch: 8,
   thermostat: 9,
   sensor: 10,
   securitySystem: 11,
   door: 12,
   window: 13,
   windowCovering: 14,
   programmableSwitch: 15,
   rangeExtender: 16,
   IPCamera: 17,
   videoDoorBell: 18,
   airPurifier: 19,
   heater: 20,
   airconditioner: 21,
   humidifer: 22,
   dehumidifier: 23
};
```

**Status Codes**

HAP Status Codes

```js
HAS.statusCodes = {
    OK: 0,
    insufficientPrivilege: -70401,
    communicationError: -70402,
    busy: -70403,
    isReadonly: -70404,
    isWriteonly: -70405,
    notificationIsNotSupported: -70406,
    outOfResource: -70407,
    timedout: -70408,
    notFound: -70409,
    invalidValue: -70410,
    insufficientAuthoriation: -70411
};
```

**Configuration**

```js
let config = new HAS.Config(name, deviceID, category, configDir, TCPPort, setupCode);
```

Parameters:

* `name`: (string) Name of accessory.

* `deviceID`: (string) ID of accessory.

* `category`: (HAS.categories) Category of accessory.

* `configDir`: (string) Path of config file. Will be created automatically if does not exists.

* `TCPPort`: (number) Port of TCP server.

* `setupCode` (string) Accessory setup code(User will use this code for pairing).

Methods:

* `config.getHASID(UUID): number`: Maps UUID to persistent unique integer.

**Server**

```js
let server = new HAS.Server(config);
```

Parameters:

* `config`: (HAS.Config) Config object.

Methods:

* `server.startServer()`: Starts the server.

* `server.stopServer(callback?)`: Stops the server.

* `server.addAccessory(accessory)`: Adds an accessory to server.

* `server.removeAccessory(accessoryID)`: Removes an accessory from server.


Properties:

* `server.onIdentify`: ((value: any, callback: (status: HAS.statusCodes) => void) => void) This function will be used to identify the server.

**Characteristic**

```js
let characteristic = new HAS.Characteristic(ID, type, valueFormat, isHidden, hasNotifications, hasValue, isReadonly, additionalAuthorization, valueUnit, description, minValue, maxValue, stepValue, maxLength, validValues, validRangeValues);
```

Parameters:

* `ID`: (number) ID of characteristic. Should be unique at service level.

* `type`: (string) Type of characteristic. Read HAP specification for more information.

* `valueFormat`: ('bool' | 'uint8' | 'uint16' | 'uint32' | 'int' | 'float' | 'string' | 'tlv8' | 'data') Data type of characteristic.

* `isHidden`: (boolean?) Whether or not this is a hidden characteristic.

* `hasNotifications`: (boolean?) Whether or not this characteristic supports notifications.

* `hasValue`: (boolean?) Whether or not this a write-only characteristic.

* `isReadonly`: (boolean?) Whether or not this a readonly characteristic.

* `additionalAuthorization`: (boolean?) Whether or not this characteristic needs additional authorization.

* `valueUnit`: (('celsius' | 'percentage' | 'arcdegrees' | 'lux' | 'seconds')?) Characteristic Value Unit

* `description`: (string?) Description of this characteristic.

* `minValue`: (number?) Characteristic Min. Value

* `maxValue`: (number?) Characteristic Max. Value

* `stepValue`: (number?) Characteristic Step Value (characteristic.value % characteristic.stepValue should be 0.)

* `maxLength`: (number?) Max. length of this characteristic(Only if characteristic is string or buffer.)

* `validValues`: (number[]?) An array of valid values.

* `validRangeValues`: (number[]?) characteristic.value >= characteristic.validRangeValues[0] && characteristic.value <= characteristic.validRangeValues[1] should be true.

Methods:

* `characteristic.setValue(value)` Sets the value of characteristic.

Properties:

* `characteristic.onWrite`: ((value: any, callback: (status: HAS.statusCodes) => void, authData?: Buffer) => void) Set this function to handle value write requests.

**Service**

```js
let service = new HAS.Service(ID, type, isHidden, isPrimary, linkedServices);
```

Parameters:

* `ID`: (number) ID of service. Should be unique at accessory level.

* `type`: (string) Type of service. Read HAP specification for more information.

* `isHidden`: (boolean) Whether or not this a hidden service.

* `isPrimary`: (boolean) Whether or not this a primary service. Each accessory can not have more than one primary service.

* `linkedServices`: (number[]) Array of IDs of linked services. Linked services should be already added to accessory.

Methods:

* `service.addCharacteristic(characteristic)` Adds a characteristic to this service.


* `service.addCharacteristics(...characteristics)` Adds a group of characteristics to this service.

**Accessory**

```js
let accessory = new HAS.Accessory(ID);
```

Parameters:

* `ID`: (number) ID of accessory. Should be unique at server level.

Methods:

* `accessory.addService(service)` Adds a service to this accessory.

* `accessory.addServices(...services)` Adds a group of services to this accessory.

**_Each accessory needs to have an information service with serviceID = 1._**

**Predefined**

Instead of creating your own services and characteristics, you can use ``HAS.predefined``.

```js
let characteristic = HAS.predefined.characteristicName(ID, value, onWrite);
```

* Parameters are described in Characteristic section.

```js
let service = HAS.predefined.serviceName(ID, characteristics, isHidden, isPrimary, linkedServices);
```

* Parameters are described in Service section.

_You can find predefined items by looking at HAP specification or source code._