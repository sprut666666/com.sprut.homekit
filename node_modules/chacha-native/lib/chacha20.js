'use strict';
var Stream = require('./cipherbase');
var inherits = require('inherits');
var Binding = require('bindings')('chacha20poly1305.node').Chacha;
module.exports = ChaChaStream;
inherits(ChaChaStream, Stream);
function ChaChaStream(key, iv) {
  if (!(this instanceof ChaChaStream)) {
    return new ChaChaStream(key, iv);
  }
  Stream.call(this);
  this.binding = new Binding(key, iv);
}

ChaChaStream.prototype._update = function (data) {
  return this.binding.update(data);
};
