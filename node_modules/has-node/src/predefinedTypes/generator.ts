/**
 * @file Generator for predefined characteristics and services
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

//Data is taken from https://raw.githubusercontent.com/brutella/hc/master/gen/metadata.json

let data = require('./data');
import * as FS from 'fs';

function undefinedOrString(value: any): string {
    if (value == undefined || value == null)
        return 'undefined';
    else
        return `"${value}"`;
}

function undefinedOrArray(value: any, isString: boolean = false): string {
    if (value == undefined || value == null)
        return 'undefined';
    else
        return isString ? `['${value.join("', '")}']` : `[${value.join(', ')}]`;
}

function getFunctionName(name: string): string {
    name = name.replace(/ /g, '').replace(/\./g, '');
    return name;
}

let codes = ['//This file is generated automatically', '//Data is taken from https://raw.githubusercontent.com/brutella/hc/master/gen/metadata.json', "import Characteristic from '../characteristic';", "import {OnWrite} from '../characteristic';", "import Service from '../service';", "", "//Characteristics"];

for (let characteristic of data.Characteristics) {
    let type = characteristic.UUID;
    let valueFormat = characteristic.Format.replace(/^int32$/g, 'int');
    let isHidden = false;
    let hasNotifications = characteristic.Properties.indexOf('cnotify') > -1;
    let hasValue = characteristic.Properties.indexOf('read') > -1;
    let isReadonly = characteristic.Properties.indexOf('write') <= -1;
    let additionalAuthorization = false;
    let valueUnit = characteristic.Unit;
    let description = characteristic.Name;
    let minValue = characteristic.Constraints ? characteristic.Constraints.MinimumValue : undefined;
    let maxValue = characteristic.Constraints ? characteristic.Constraints.MaximumValue : undefined;
    let stepValue = characteristic.Constraints ? characteristic.Constraints.StepValue : undefined;
    let maxLength = undefined;
    let validValues = (characteristic.Constraints && (characteristic.Constraints.ValidValues || characteristic.Constraints.ValidBits)) ? Object.keys(characteristic.Constraints.ValidValues || characteristic.Constraints.ValidBits).map(value => parseInt(value)) : undefined;
    let validRangeValues = undefined;
    let code = `export function ${getFunctionName(description)}(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '${type}', '${valueFormat}', ${isHidden}, ${hasNotifications}, ${hasValue}, ${isReadonly}, ${additionalAuthorization}, ${undefinedOrString(valueUnit)}, ${undefinedOrString(description)}, ${minValue}, ${maxValue}, ${stepValue}, ${maxLength}, ${undefinedOrArray(validValues)}, ${validRangeValues});
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}`;

    codes.push(code);
}

codes.push("");
codes.push("//Services");

for (let service of data.Services) {
    let type = service.UUID;
    let name = service.Name;

    let code = `export function ${getFunctionName(name)}(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '${type}', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ${undefinedOrArray(service.RequiredCharacteristics, true)};
    let optionalCharacteristics = ${undefinedOrArray(service.OptionalCharacteristics, true)};
    
    for (let type of requiredCharacteristics) {
        let OK = false;
        
        for (let characteristic of characteristics) {
            if (characteristic.getType() == type) {
                OK = true;
                break;
            }
        }
        
        if (!OK)
            throw new Error(type + 'is required for this service: ' + ID);
    }
    
    for (let characteristic of characteristics) {
        if (requiredCharacteristics.indexOf(characteristic.getType()) <= -1 && optionalCharacteristics.indexOf(characteristic.getType()) <= -1)
            throw new Error(ID + ' can not contain ' + characteristic.getType());
            
        service.addCharacteristic(characteristic);
    }
    
    return service;
}`;

    codes.push(code);
}

FS.writeFileSync(__dirname + '/predefined.ts', codes.join("\n\n"));
