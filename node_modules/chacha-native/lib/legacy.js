'use strict';
var Stream = require('./cipherbase');
var inherits = require('inherits');
var Binding = require('bindings')('chacha20poly1305.node').Legacy;
module.exports = AEAD;
inherits(AEAD, Stream);
function AEAD(key, iv, decrypt) {
  if (!(this instanceof AEAD)) {
    return new AEAD(key, iv, decrypt);
  }
  Stream.call(this);
  this.binding = new Binding(key, Buffer.concat([new Buffer([0,0,0,0]), iv]), decrypt);
  this._tag = void 0;
  this._decrypt = !!decrypt;
  this._aadAdded = false;
}

AEAD.prototype._update = function (data) {
  if (!this._aadAdded) {
    this.setAAD(new Buffer(''));
  }
  return this.binding.update(data);
};

AEAD.prototype._final = function () {
  if (!this._aadAdded) {
    this.setAAD(new Buffer(''));
  }
  if (this._decrypt && !this._tag) {
    throw new Error('invalid state');
  }
  if (this._decrypt) {
    this.binding.finish(this._tag);
    this._tag = void 0;
  } else {
    this._tag = this.binding.finish();
  }
};
AEAD.prototype.setAAD = function (aad) {
  this.binding.setAAD(aad);
  this._aadAdded = true;
  return this;
};

AEAD.prototype.getAuthTag = function () {
  if (!this._tag || this._decrypt) {
    throw new Error('invalid state');
  }
  return this._tag;
};

AEAD.prototype.setAuthTag = function (tag) {
  if (this._tag || !this._decrypt) {
    throw new Error('invalid state');
  }
  this._tag = tag;
  return this;
};
