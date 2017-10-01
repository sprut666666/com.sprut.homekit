import Config from './config';
import TCP from './TCP';
import Accessory from './accessory';
import { statusCodes } from './TLV/values';
declare module 'http' {
    interface Server {
        destroy(callback?: () => void): void;
    }
}
export default class HAS {
    config: Config;
    bonjour: any;
    private bonjourService;
    private expressApp;
    TCPServer: TCP;
    private HTTPServer;
    private accessories;
    private isRunning;
    onIdentify: (value: any, callback: (status: statusCodes) => void) => void;
    constructor(config: Config);
    startServer(): void;
    stopServer(callback?: () => void): void;
    updateBonjour(): void;
    addAccessory(accessory: Accessory): void;
    removeAccessory(accessoryID: number): void;
    getAccessories(): {
        [index: number]: Accessory;
    };
}
