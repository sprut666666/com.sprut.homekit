/**
 * @file ChaCha20Poly1305AEAD implementation for HAP
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

const ChaCha = require('chacha-native');

export function decrypt(key: Buffer, nonceString: string, tag: Buffer, encryptedData: Buffer): Buffer | boolean {
    try {
        let nonce = Buffer.alloc(12);
        Buffer.from(nonceString).copy(nonce, 4);
        let decipher = new ChaCha.aead(key, nonce, true);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function encrypt(key: Buffer, nonceString: string, plainData: Buffer): Buffer {
    let nonce = Buffer.alloc(12);
    Buffer.from(nonceString).copy(nonce, 4);
    let cipher = new ChaCha.aead(key, nonce);

    let encrypted = Buffer.concat([cipher.update(plainData), cipher.final()]);
    return Buffer.concat([encrypted, cipher.getAuthTag()]);
}

export function expertDecrypt(key: Buffer, nonce: Buffer, tag: Buffer, data: Buffer, AAD: Buffer): Buffer | boolean {
    try {
        let decipher = new ChaCha.aead(key, nonce, true);
        decipher.setAAD(AAD);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(data), decipher.final()]);
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function expertEncrypt(key: Buffer, nonce: Buffer, plainData: Buffer, AAD: Buffer): Buffer {
    let cipher = new ChaCha.aead(key, nonce);
    cipher.setAAD(AAD);
    let encrypted = Buffer.concat([cipher.update(plainData), cipher.final()]);
    return Buffer.concat([encrypted, cipher.getAuthTag()]);
}