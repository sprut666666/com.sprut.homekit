/**
 * @file Generator for predefined characteristics and services
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

// Data is taken from https://raw.githubusercontent.com/brutella/hc/master/gen/metadata.json

const data = require('./data');
import * as FS from 'fs';

function undefinedOrString(value: any): string {
    if (value == undefined || value == undefined)
        return 'undefined';
    else
        return `"${value}"`;
}

function undefinedOrArray(value: any, isString: boolean = false): string {
    if (value == undefined || value == undefined)
        return 'undefined';
    else
        return isString ? `['${value.join("', '")}']` : `[${value.join(', ')}]`;
}

function getFunctionName(name: string): string {
    name = name.replace(/ /g, '').replace(/\./g, '');
    return name;
}

const codes = ['// This file is generated automatically', '// Data is taken from https://raw.githubusercontent.com/brutella/hc/master/gen/metadata.json', "import Characteristic from '../characteristic';", "import {OnWrite} from '../characteristic';", "import Service from '../service';", "", "// Characteristics"];

for (const characteristic of data.Characteristics) {
    const type = characteristic.UUID;
    const valueFormat = characteristic.Format.replace(/^int32$/g, 'int');
    const isHidden = false;
    const hasNotifications = characteristic.Properties.indexOf('cnotify') > -1;
    const hasValue = characteristic.Properties.indexOf('read') > -1;
    const isReadonly = characteristic.Properties.indexOf('write') <= -1;
    const additionalAuthorization = false;
    const valueUnit = characteristic.Unit;
    const description = characteristic.Name;
    const minValue = characteristic.Constraints ? characteristic.Constraints.MinimumValue : undefined;
    const maxValue = characteristic.Constraints ? characteristic.Constraints.MaximumValue : undefined;
    const stepValue = characteristic.Constraints ? characteristic.Constraints.StepValue : undefined;
    const maxLength = undefined;
    const validValues = (characteristic.Constraints && (characteristic.Constraints.ValidValues || characteristic.Constraints.ValidBits)) ? Object.keys(characteristic.Constraints.ValidValues || characteristic.Constraints.ValidBits).map(value => parseInt(value)) : undefined;
    const validRangeValues = undefined;
    const code = `export function ${getFunctionName(description)}(ID: number, value: any, onWrite?: OnWrite): Characteristic {
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
codes.push("// Services");

for (const service of data.Services) {
    const type = service.UUID;
    const name = service.Name;

    const code = `export function ${getFunctionName(name)}(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = [], checkCharacteristics: boolean = true): Service {
    let service = new Service(ID, '${type}', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ${undefinedOrArray(service.RequiredCharacteristics, true)};
    let optionalCharacteristics = ${undefinedOrArray(service.OptionalCharacteristics, true)};
    
    if (!checkCharacteristics) {
        for (let characteristic of characteristics)
            service.addCharacteristic(characteristic);
        return service;
    }
    
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
