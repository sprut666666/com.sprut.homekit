'use strict';

var Cipher = require('./aead');
exports.aead = Cipher;
exports.createCipher = createCipher;
function createCipher(key, iv) {
  return new Cipher(key, iv);
}
exports.createDecipher = createDecipher;
function createDecipher(key, iv) {
  return new Cipher(key, iv, true);
}

exports.createHmac = require('./poly-stream');
exports.chacha20 = exports.ChaCha20 = require('./chacha20');
exports.aeadLegacy = exports.AeadLegacy = require('./legacy');
