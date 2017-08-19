"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function HKDF(input, salt, info, size, hashFunction) {
    if (salt === void 0) { salt = 'Pair-Setup-Encrypt-Salt'; }
    if (info === void 0) { info = 'Pair-Setup-Encrypt-Info'; }
    if (size === void 0) { size = 32; }
    if (hashFunction === void 0) { hashFunction = 'sha512'; }
    var hash = crypto.createHash(hashFunction);
    var hashLength = hash.digest().length;
    var digest = crypto.createHmac(hashFunction, Buffer.from(salt)).update(input).digest();
    var prev = Buffer.alloc(0), output = Buffer.alloc(size), blockNums = Math.ceil(size / hashLength);
    if (!Buffer.isBuffer(info))
        info = Buffer.from(info);
    for (var index = 0; index < blockNums; index++) {
        prev = crypto.createHmac(hashFunction, digest).update(Buffer.concat([prev, info, Buffer.from(String.fromCharCode(index + 1))])).digest();
        prev.copy(output, hashLength * index);
    }
    return output;
}
exports.default = HKDF;
