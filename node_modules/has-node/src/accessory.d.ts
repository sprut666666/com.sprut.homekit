import Service from './service';
import HAS from './HAS';
import Characteristic from './characteristic';
export default class Accessory {
    private ID;
    private services;
    private primaryService;
    private IIDMap;
    private server?;
    constructor(ID: number);
    getID(): number;
    getServices(): {
        [index: number]: Service;
    };
    setServer(server: HAS): void;
    getServer(): HAS;
    addService(service: Service): void;
    addServices(...services: Service[]): void;
    getCharacteristic(IID: number): Characteristic | boolean;
    getIID(serviceID: number, characteristicID: number): number;
    toJSON(): {};
}
