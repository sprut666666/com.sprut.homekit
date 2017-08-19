var Transform = require('stream').Transform;
var inherits = require('inherits');

module.exports = CipherBase;
inherits(CipherBase, Transform);
function CipherBase(digest) {
  if (digest) {
    this.digest = finalFunc;
  } else {
    this.final = finalFunc;
  }

}
[
  '_readableState',
  '_writableState',
  '_transformState'
].forEach(function(prop) {
  Object.defineProperty(CipherBase.prototype, prop, {
    get: function() {
      Transform.call(this);
      return this[prop];
    },
    set: function(val) {
      Object.defineProperty(this, prop, {
        value: val,
        enumerable: true,
        configurable: true,
        writable: true
      });
    },
    configurable: true,
    enumerable: true
  });
});
CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
  if (typeof data === 'string') {
    data = new Buffer(data, inputEnc);
  }
  var outData = this._update(data) || new Buffer('');
  if (outputEnc) {
    outData = outData.toString(outputEnc);
  }
  if (this.digest) {
    return this;
  }
  return outData;
};
CipherBase.prototype._transform = function (data, _, next) {
  this.push(this._update(data));
  next();
};
CipherBase.prototype._flush = function (next) {
  try {
    this.push(this._final());
  } catch(e) {
    return next(e);
  }
  next();
};
function finalFunc (outputEnc) {
  var outData = this._final() || new Buffer('');
  if (outputEnc) {
    outData = outData.toString(outputEnc);
  }
  return outData;
};
CipherBase.prototype._final = function () {};
