import Accessory from './accessory';
import Characteristic from './Characteristic';
export default class Service {
    private ID;
    private type;
    private characteristics;
    private isPrimary;
    private isHidden;
    private accessory?;
    private linkedServices;
    constructor(ID: number, type: string, isHidden: boolean, isPrimary: boolean, linkedServices: number[]);
    getID(): number;
    getCharacteristics(): {
        [index: number]: Characteristic;
    };
    setAccessory(accessory: Accessory): void;
    getAccessory(): Accessory;
    getIsPrimary(): boolean;
    getLinkedServices(): number[];
    addCharacteristic(characteristic: Characteristic): void;
    addCharacteristics(...characteristics: Characteristic[]): void;
    toJSON(): {
        [index: string]: any;
    };
}
