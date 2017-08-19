'use strict';
var Stream = require('./cipherbase');
var inherits = require('inherits');
var Binding = require('bindings')('chacha20poly1305.node').Poly;
module.exports = PolyStream;
inherits(PolyStream, Stream);
function PolyStream(key) {
  if (!(this instanceof PolyStream)) {
    return new PolyStream(key);
  }
  Stream.call(this, true);
  this.binding = new Binding(key);
}

PolyStream.prototype._update = function (data) {
  this.binding.update(data);
};

PolyStream.prototype._final = function () {
  return this.binding.finish();
};
