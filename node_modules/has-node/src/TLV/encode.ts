/**
 * @file Encode TLV
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import {TLVErrors, TLVValues} from './values';

export interface TLVITem {
    key: number;
    value: any;
}

export function encodeTLV(TLVItems: TLVITem[]): Buffer {
    const buffers: Buffer[] = [];
    for (const item of TLVItems) {
        let buffer;
        if (Buffer.isBuffer(item.value))
            buffer = item.value;
        else if (isNaN(item.value))
            buffer = Buffer.from(item.value, 'utf8');
        else
            buffer = Buffer.from([item.value]);
        if (buffer.length > 255) {
            let offset = 0;
            while (true) {
                const iBuffer = buffer.slice(offset, offset + 255);
                buffers.push(Buffer.concat([Buffer.from([item.key, iBuffer.length]), iBuffer]));
                offset += iBuffer.length;
                if (offset + 1 >= buffer.length)
                    break;
            }
        } else
            buffers.push(Buffer.concat([Buffer.from([item.key, buffer.length]), buffer]));
    }
    return Buffer.concat(buffers);
}

export function encodeTLVError(error: TLVErrors, currentState: number) {
    return encodeTLV([
        {
            key: TLVValues.state,
            value: currentState + 1
        }, {
            key: TLVValues.error,
            value: error
        }]);
}