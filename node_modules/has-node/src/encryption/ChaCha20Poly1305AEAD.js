"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChaCha = require('chacha-native');
function decrypt(key, nonceString, tag, encryptedData) {
    try {
        var nonce = Buffer.alloc(12);
        Buffer.from(nonceString).copy(nonce, 4);
        var decipher = new ChaCha.aead(key, nonce, true);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.decrypt = decrypt;
function encrypt(key, nonceString, plainData) {
    var nonce = Buffer.alloc(12);
    Buffer.from(nonceString).copy(nonce, 4);
    var cipher = new ChaCha.aead(key, nonce);
    var encrypted = Buffer.concat([cipher.update(plainData), cipher.final()]);
    return Buffer.concat([encrypted, cipher.getAuthTag()]);
}
exports.encrypt = encrypt;
function expertDecrypt(key, nonce, tag, data, AAD) {
    try {
        var decipher = new ChaCha.aead(key, nonce, true);
        decipher.setAAD(AAD);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(data), decipher.final()]);
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
exports.expertDecrypt = expertDecrypt;
function expertEncrypt(key, nonce, plainData, AAD) {
    var cipher = new ChaCha.aead(key, nonce);
    cipher.setAAD(AAD);
    var encrypted = Buffer.concat([cipher.update(plainData), cipher.final()]);
    return Buffer.concat([encrypted, cipher.getAuthTag()]);
}
exports.expertEncrypt = expertEncrypt;
