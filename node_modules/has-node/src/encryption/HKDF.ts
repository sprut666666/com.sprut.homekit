/**
 * @file HKDF implementation for HAP / Based on: https://github.com/benadida/node-hkdf/blob/master/lib/hkdf.js
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */
import * as crypto from 'crypto';

export default function HKDF(input: Buffer, salt: string = 'Pair-Setup-Encrypt-Salt', info: string | Buffer = 'Pair-Setup-Encrypt-Info', size: number = 32, hashFunction: string = 'sha512'): Buffer {
    const hash = crypto.createHash(hashFunction);
    const hashLength = hash.digest().length;
    const digest = crypto.createHmac(hashFunction, Buffer.from(salt)).update(input).digest();

    let prev = Buffer.alloc(0);

    const output = Buffer.alloc(size),
        blockNums = Math.ceil(size / hashLength);

    if (!Buffer.isBuffer(info))
        info = Buffer.from(info);
    for (let index = 0; index < blockNums; index++) {
        prev = crypto.createHmac(hashFunction, digest).update(Buffer.concat([prev, info, Buffer.from(String.fromCharCode(index + 1))])).digest();
        prev.copy(output, hashLength * index);
    }
    return output;
}