//This file is generated automatically

//Data is taken from https://raw.githubusercontent.com/brutella/hc/master/gen/metadata.json

import Characteristic from '../characteristic';

import {OnWrite} from '../characteristic';

import Service from '../service';



//Characteristics

export function AccessoryFlags(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000A6-0000-1000-8000-0026BB765291', 'uint32', false, true, true, true, false, undefined, "Accessory Flags", undefined, undefined, undefined, undefined, [0], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Active(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B0-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Active", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function AdministratorOnlyAccess(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000001-0000-1000-8000-0026BB765291', 'bool', false, true, true, false, false, undefined, "Administrator Only Access", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function AirParticulateDensity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000064-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Air Particulate Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function AirParticulateSize(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000065-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Air Particulate Size", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function AirQuality(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000095-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Air Quality", undefined, undefined, undefined, undefined, [0, 1, 2, 3, 4, 5], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function AudioFeedback(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000005-0000-1000-8000-0026BB765291', 'bool', false, true, true, false, false, undefined, "Audio Feedback", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function BatteryLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000068-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, "percentage", "Battery Level", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Brightness(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000008-0000-1000-8000-0026BB765291', 'int', false, true, true, false, false, "percentage", "Brightness", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CarbonDioxideDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000092-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Carbon Dioxide Detected", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CarbonDioxideLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000093-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Carbon Dioxide Level", 0, 100000, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CarbonDioxidePeakLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000094-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Carbon Dioxide Peak Level", 0, 100000, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CarbonMonoxideDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000069-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Carbon Monoxide Detected", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CarbonMonoxideLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000090-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Carbon Monoxide Level", 0, 100, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CarbonMonoxidePeakLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000091-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Carbon Monoxide Peak Level", 0, 100, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ChargingState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000008F-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Charging State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ColorTemperature(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000CE-0000-1000-8000-0026BB765291', 'uint32', false, true, true, false, false, undefined, "Color Temperature", 140, 500, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ContactSensorState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000006A-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Contact Sensor State", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CoolingThresholdTemperature(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000000D-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "celsius", "Cooling Threshold Temperature", 10, 35, 0.1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentAirPurifierState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000A9-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Air Purifier State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentAmbientLightLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000006B-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, "lux", "Current Ambient Light Level", 0.0001, 100000, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentDoorState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000000E-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Door State", undefined, undefined, undefined, undefined, [0, 1, 2, 3, 4], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentFanState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000AF-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Fan State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentHeaterCoolerState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B1-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Heater Cooler State", undefined, undefined, undefined, undefined, [0, 1, 2, 3], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentHeatingCoolingState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000000F-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Heating Cooling State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentHorizontalTiltAngle(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000006C-0000-1000-8000-0026BB765291', 'int', false, true, true, true, false, "arcdegrees", "Current Horizontal Tilt Angle", -90, 90, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentHumidifierDehumidifierState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B3-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Humidifier Dehumidifier State", undefined, undefined, undefined, undefined, [0, 1, 2, 3], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentPosition(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000006D-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, "percentage", "Current Position", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentRelativeHumidity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000010-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, "percentage", "Current Relative Humidity", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentSlatState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000AA-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Current Slat State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentTemperature(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000011-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, "celsius", "Current Temperature", 0, 100, 0.1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentTiltAngle(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C1-0000-1000-8000-0026BB765291', 'int', false, true, true, true, false, "arcdegrees", "Current Tilt Angle", -90, 90, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function CurrentVerticalTiltAngle(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000006E-0000-1000-8000-0026BB765291', 'int', false, true, true, true, false, "arcdegrees", "Current Vertical Tilt Angle", -90, 90, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function DigitalZoom(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000011D-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, undefined, "Digital Zoom", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function FilterChangeIndication(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000AC-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Filter Change Indication", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function FilterLifeLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000AB-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Filter Life Level", 0, 100, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function FirmwareRevision(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000052-0000-1000-8000-0026BB765291', 'string', false, false, true, true, false, undefined, "Firmware Revision", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function HardwareRevision(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000053-0000-1000-8000-0026BB765291', 'string', false, false, true, true, false, undefined, "Hardware Revision", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function HeatingThresholdTemperature(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000012-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "celsius", "Heating Threshold Temperature", 0, 25, 0.1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function HoldPosition(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000006F-0000-1000-8000-0026BB765291', 'bool', false, false, false, false, false, undefined, "Hold Position", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Hue(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000013-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "arcdegrees", "Hue", 0, 360, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Identify(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000014-0000-1000-8000-0026BB765291', 'bool', false, false, false, false, false, undefined, "Identify", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ImageMirroring(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000011F-0000-1000-8000-0026BB765291', 'bool', false, true, true, false, false, undefined, "Image Mirroring", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ImageRotation(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000011E-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "arcdegrees", "Image Rotation", 0, 270, 90, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LeakDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000070-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Leak Detected", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LockControlPoint(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000019-0000-1000-8000-0026BB765291', 'tlv8', false, false, false, false, false, undefined, "Lock Control Point", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LockCurrentState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000001D-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Lock Current State", undefined, undefined, undefined, undefined, [0, 1, 2, 3], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LockLastKnownAction(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000001C-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Lock Last Known Action", undefined, undefined, undefined, undefined, [0, 1, 2, 3, 4, 5, 6, 7, 8], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LockManagementAutoSecurityTimeout(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000001A-0000-1000-8000-0026BB765291', 'uint32', false, true, true, false, false, "seconds", "Lock Management Auto Security Timeout", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LockPhysicalControls(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000A7-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Lock Physical Controls", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function LockTargetState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000001E-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Lock Target State", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Logs(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000001F-0000-1000-8000-0026BB765291', 'tlv8', false, true, true, true, false, undefined, "Logs", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Manufacturer(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000020-0000-1000-8000-0026BB765291', 'string', false, false, true, true, false, undefined, "Manufacturer", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Model(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000021-0000-1000-8000-0026BB765291', 'string', false, false, true, true, false, undefined, "Model", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function MotionDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000022-0000-1000-8000-0026BB765291', 'bool', false, true, true, true, false, undefined, "Motion Detected", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Mute(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000011A-0000-1000-8000-0026BB765291', 'bool', false, true, true, false, false, undefined, "Mute", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Name(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000023-0000-1000-8000-0026BB765291', 'string', false, false, true, true, false, undefined, "Name", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function NightVision(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000011B-0000-1000-8000-0026BB765291', 'bool', false, true, true, false, false, undefined, "Night Vision", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function NitrogenDioxideDensity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C4-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Nitrogen Dioxide Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ObstructionDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000024-0000-1000-8000-0026BB765291', 'bool', false, true, true, true, false, undefined, "Obstruction Detected", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function OccupancyDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000071-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Occupancy Detected", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function On(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000025-0000-1000-8000-0026BB765291', 'bool', false, true, true, false, false, undefined, "On", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function OpticalZoom(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000011C-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, undefined, "Optical Zoom", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function OutletInUse(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000026-0000-1000-8000-0026BB765291', 'bool', false, true, true, true, false, undefined, "Outlet In Use", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function OzoneDensity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C3-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Ozone Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PairSetup(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000004C-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, false, false, undefined, "Pair Setup", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PairVerify(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000004E-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, false, false, undefined, "Pair Verify", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PairingFeatures(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000004F-0000-1000-8000-0026BB765291', 'uint8', false, false, true, true, false, undefined, "Pairing Features", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PairingPairings(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000050-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, false, false, undefined, "Pairing Pairings", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PM10Density(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C7-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "PM10 Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PM25Density(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C6-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "PM2.5 Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function PositionState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000072-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Position State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ProgrammableSwitchEvent(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000073-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Programmable Switch Event", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function RelativeHumidityDehumidifierThreshold(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C9-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, undefined, "Relative Humidity Dehumidifier Threshold", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function RelativeHumidityHumidifierThreshold(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000CA-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, undefined, "Relative Humidity Humidifier Threshold", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ResetFilterIndication(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000AD-0000-1000-8000-0026BB765291', 'uint8', false, false, false, false, false, undefined, "Reset Filter Indication", 1, 1, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function RotationDirection(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000028-0000-1000-8000-0026BB765291', 'int', false, true, true, false, false, undefined, "Rotation Direction", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function RotationSpeed(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000029-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "percentage", "Rotation Speed", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Saturation(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000002F-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "percentage", "Saturation", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SecuritySystemAlarmType(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000008E-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Security System Alarm Type", 0, 1, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SecuritySystemCurrentState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000066-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Security System Current State", undefined, undefined, undefined, undefined, [0, 1, 2, 3, 4], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SecuritySystemTargetState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000067-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Security System Target State", undefined, undefined, undefined, undefined, [0, 1, 2, 3], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SelectedRTPStreamConfiguration(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000117-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, false, false, undefined, "Selected RTP Stream Configuration", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SerialNumber(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000030-0000-1000-8000-0026BB765291', 'string', false, false, true, true, false, undefined, "Serial Number", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ServiceLabelIndex(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000CB-0000-1000-8000-0026BB765291', 'uint8', false, false, true, true, false, undefined, "Service Label Index", 1, 255, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function ServiceLabelNamespace(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000CD-0000-1000-8000-0026BB765291', 'uint8', false, false, true, true, false, undefined, "Service Label Namespace", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SetupEndpoints(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000118-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, false, false, undefined, "Setup Endpoints", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SlatType(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C0-0000-1000-8000-0026BB765291', 'uint8', false, false, true, true, false, undefined, "Slat Type", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SmokeDetected(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000076-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Smoke Detected", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function StatusActive(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000075-0000-1000-8000-0026BB765291', 'bool', false, true, true, true, false, undefined, "Status Active", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function StatusFault(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000077-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Status Fault", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function StatusJammed(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000078-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Status Jammed", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function StatusLowBattery(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000079-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Status Low Battery", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function StatusTampered(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000007A-0000-1000-8000-0026BB765291', 'uint8', false, true, true, true, false, undefined, "Status Tampered", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function StreamingStatus(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000120-0000-1000-8000-0026BB765291', 'tlv8', false, true, true, true, false, undefined, "Streaming Status", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SulphurDioxideDensity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C5-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Sulphur Dioxide Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SupportedAudioStreamConfiguration(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000115-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, true, false, undefined, "Supported Audio Stream Configuration", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SupportedRTPConfiguration(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000116-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, true, false, undefined, "Supported RTP Configuration", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SupportedVideoStreamConfiguration(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000114-0000-1000-8000-0026BB765291', 'tlv8', false, false, true, true, false, undefined, "Supported Video Stream Configuration", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function SwingMode(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B6-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Swing Mode", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetAirPurifierState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000A8-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Air Purifier State", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetAirQuality(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000AE-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Air Quality", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetDoorState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000032-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Door State", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetFanState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000BF-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Fan State", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetHeaterCoolerState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B2-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Heater Cooler State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetHeatingCoolingState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000033-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Heating Cooling State", undefined, undefined, undefined, undefined, [0, 1, 2, 3], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetHorizontalTiltAngle(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000007B-0000-1000-8000-0026BB765291', 'int', false, true, true, false, false, "arcdegrees", "Target Horizontal Tilt Angle", -90, 90, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetHumidifierDehumidifierState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B4-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Humidifier Dehumidifier State", undefined, undefined, undefined, undefined, [0, 1, 2], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetPosition(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000007C-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, "percentage", "Target Position", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetRelativeHumidity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000034-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "percentage", "Target Relative Humidity", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetSlatState(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000BE-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Target Slat State", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetTemperature(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000035-0000-1000-8000-0026BB765291', 'float', false, true, true, false, false, "celsius", "Target Temperature", 10, 38, 0.1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetTiltAngle(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C2-0000-1000-8000-0026BB765291', 'int', false, true, true, false, false, "arcdegrees", "Target Tilt Angle", -90, 90, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TargetVerticalTiltAngle(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '0000007D-0000-1000-8000-0026BB765291', 'int', false, true, true, false, false, "arcdegrees", "Target Vertical Tilt Angle", -90, 90, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function TemperatureDisplayUnits(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000036-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, undefined, "Temperature Display Units", undefined, undefined, undefined, undefined, [0, 1], undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Version(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000037-0000-1000-8000-0026BB765291', 'string', false, true, true, true, false, undefined, "Version", undefined, undefined, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function VOCDensity(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000C8-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "VOC Density", 0, 1000, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function Volume(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '00000119-0000-1000-8000-0026BB765291', 'uint8', false, true, true, false, false, "percentage", "Volume", 0, 100, 1, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}

export function WaterLevel(ID: number, value: any, onWrite?: OnWrite): Characteristic {
    let characteristic = new Characteristic(ID, '000000B5-0000-1000-8000-0026BB765291', 'float', false, true, true, true, false, undefined, "Water Level", 0, 100, undefined, undefined, undefined, undefined);
    if (value != null && value != undefined)
        characteristic.setValue(value);
    if (onWrite)
        characteristic.onWrite = onWrite;
    return characteristic;
}



//Services

export function AccessoryInformation(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000003E-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000014-0000-1000-8000-0026BB765291', '00000020-0000-1000-8000-0026BB765291', '00000021-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '00000030-0000-1000-8000-0026BB765291', '00000052-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000053-0000-1000-8000-0026BB765291', '000000A6-0000-1000-8000-0026BB765291'];
    
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
}

export function AirPurifier(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000BB-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['000000B0-0000-1000-8000-0026BB765291', '000000A9-0000-1000-8000-0026BB765291', '000000A8-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['000000A7-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '000000B6-0000-1000-8000-0026BB765291', '00000029-0000-1000-8000-0026BB765291'];
    
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
}

export function AirQualitySensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000008D-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000095-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '000000C3-0000-1000-8000-0026BB765291', '000000C4-0000-1000-8000-0026BB765291', '000000C5-0000-1000-8000-0026BB765291', '000000C6-0000-1000-8000-0026BB765291', '000000C7-0000-1000-8000-0026BB765291', '000000C8-0000-1000-8000-0026BB765291', '00000090-0000-1000-8000-0026BB765291', '00000093-0000-1000-8000-0026BB765291'];
    
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
}

export function BatteryService(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000096-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000068-0000-1000-8000-0026BB765291', '0000008F-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function CameraRTPStreamManagement(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000110-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000114-0000-1000-8000-0026BB765291', '00000115-0000-1000-8000-0026BB765291', '00000116-0000-1000-8000-0026BB765291', '00000117-0000-1000-8000-0026BB765291', '00000120-0000-1000-8000-0026BB765291', '00000118-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function CarbonDioxideSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000097-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000092-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000093-0000-1000-8000-0026BB765291', '00000094-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function CarbonMonoxideSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000007F-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000069-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000090-0000-1000-8000-0026BB765291', '00000091-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function ContactSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000080-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000006A-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Door(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000081-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000006D-0000-1000-8000-0026BB765291', '00000072-0000-1000-8000-0026BB765291', '0000007C-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['0000006F-0000-1000-8000-0026BB765291', '00000024-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Doorbell(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000121-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000073-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000008-0000-1000-8000-0026BB765291', '00000119-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Fan(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000040-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000025-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000028-0000-1000-8000-0026BB765291', '00000029-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Fanv2(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000B7-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['000000B0-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['000000AF-0000-1000-8000-0026BB765291', '000000BF-0000-1000-8000-0026BB765291', '000000A7-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '00000028-0000-1000-8000-0026BB765291', '00000029-0000-1000-8000-0026BB765291', '000000B6-0000-1000-8000-0026BB765291'];
    
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
}

export function FilterMaintenance(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000BA-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['000000AC-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['000000AB-0000-1000-8000-0026BB765291', '000000AD-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function GarageDoorOpener(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000041-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000000E-0000-1000-8000-0026BB765291', '00000032-0000-1000-8000-0026BB765291', '00000024-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['0000001D-0000-1000-8000-0026BB765291', '0000001E-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function HeaterCooler(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000BC-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['000000B0-0000-1000-8000-0026BB765291', '000000B1-0000-1000-8000-0026BB765291', '000000B2-0000-1000-8000-0026BB765291', '00000011-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['000000A7-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '000000B6-0000-1000-8000-0026BB765291', '0000000D-0000-1000-8000-0026BB765291', '00000012-0000-1000-8000-0026BB765291', '00000036-0000-1000-8000-0026BB765291', '00000029-0000-1000-8000-0026BB765291'];
    
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
}

export function HumidifierDehumidifier(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000BD-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000010-0000-1000-8000-0026BB765291', '000000B3-0000-1000-8000-0026BB765291', '000000B4-0000-1000-8000-0026BB765291', '000000B0-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['000000A7-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '000000B6-0000-1000-8000-0026BB765291', '000000B5-0000-1000-8000-0026BB765291', '000000C9-0000-1000-8000-0026BB765291', '000000CA-0000-1000-8000-0026BB765291', '00000029-0000-1000-8000-0026BB765291'];
    
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
}

export function HumiditySensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000082-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000010-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function LeakSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000083-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000070-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function LightSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000084-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000006B-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Lightbulb(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000043-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000025-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000008-0000-1000-8000-0026BB765291', '00000013-0000-1000-8000-0026BB765291', '0000002F-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291', '000000CE-0000-1000-8000-0026BB765291'];
    
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
}

export function LockManagement(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000044-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000019-0000-1000-8000-0026BB765291', '00000037-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['0000001F-0000-1000-8000-0026BB765291', '00000005-0000-1000-8000-0026BB765291', '0000001A-0000-1000-8000-0026BB765291', '00000001-0000-1000-8000-0026BB765291', '0000001C-0000-1000-8000-0026BB765291', '0000000E-0000-1000-8000-0026BB765291', '00000022-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function LockMechanism(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000045-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000001D-0000-1000-8000-0026BB765291', '0000001E-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Microphone(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000112-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000011A-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000119-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function MotionSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000085-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000022-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function OccupancySensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000086-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000071-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Outlet(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000047-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000025-0000-1000-8000-0026BB765291', '00000026-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function SecuritySystem(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000007E-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000066-0000-1000-8000-0026BB765291', '00000067-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '0000008E-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function ServiceLabel(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000CC-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['000000CD-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Slat(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '000000B9-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['000000C0-0000-1000-8000-0026BB765291', '000000AA-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291', '000000C1-0000-1000-8000-0026BB765291', '000000C2-0000-1000-8000-0026BB765291', '000000B6-0000-1000-8000-0026BB765291'];
    
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
}

export function SmokeSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000087-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000076-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Speaker(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000113-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000011A-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000119-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function StatelessProgrammableSwitch(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000089-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000073-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291', '000000CB-0000-1000-8000-0026BB765291'];
    
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
}

export function Switch(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '00000049-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000025-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function TemperatureSensor(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000008A-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['00000011-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000075-0000-1000-8000-0026BB765291', '00000077-0000-1000-8000-0026BB765291', '00000079-0000-1000-8000-0026BB765291', '0000007A-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Thermostat(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000004A-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000000F-0000-1000-8000-0026BB765291', '00000033-0000-1000-8000-0026BB765291', '00000011-0000-1000-8000-0026BB765291', '00000035-0000-1000-8000-0026BB765291', '00000036-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['00000010-0000-1000-8000-0026BB765291', '00000034-0000-1000-8000-0026BB765291', '0000000D-0000-1000-8000-0026BB765291', '00000012-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function Window(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000008B-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000006D-0000-1000-8000-0026BB765291', '0000007C-0000-1000-8000-0026BB765291', '00000072-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['0000006F-0000-1000-8000-0026BB765291', '00000024-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}

export function WindowCovering(ID: number, characteristics: Characteristic[], isHidden: boolean = false, isPrimary: boolean = false, linkedServices: number[] = []): Service {
    let service = new Service(ID, '0000008C-0000-1000-8000-0026BB765291', isHidden, isPrimary, linkedServices);
    
    let requiredCharacteristics = ['0000006D-0000-1000-8000-0026BB765291', '0000007C-0000-1000-8000-0026BB765291', '00000072-0000-1000-8000-0026BB765291'];
    let optionalCharacteristics = ['0000006F-0000-1000-8000-0026BB765291', '0000007B-0000-1000-8000-0026BB765291', '0000007D-0000-1000-8000-0026BB765291', '0000006C-0000-1000-8000-0026BB765291', '0000006E-0000-1000-8000-0026BB765291', '00000024-0000-1000-8000-0026BB765291', '00000023-0000-1000-8000-0026BB765291'];
    
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
}