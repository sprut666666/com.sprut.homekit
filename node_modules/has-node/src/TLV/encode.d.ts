/// <reference types="node" />
import { TLVErrors } from './values';
export interface TLVITem {
    key: number;
    value: any;
}
export declare function encodeTLV(TLVItems: TLVITem[]): Buffer;
export declare function encodeTLVError(error: TLVErrors, currentState: number): Buffer;
