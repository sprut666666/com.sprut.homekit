"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var values_1 = require("./values");
function encodeTLV(TLVItems) {
    var buffers = [];
    for (var _i = 0, TLVItems_1 = TLVItems; _i < TLVItems_1.length; _i++) {
        var item = TLVItems_1[_i];
        var buffer = void 0;
        if (Buffer.isBuffer(item.value))
            buffer = item.value;
        else if (isNaN(item.value))
            buffer = Buffer.from(item.value, 'utf8');
        else
            buffer = Buffer.from([item.value]);
        if (buffer.length > 255) {
            var offset = 0;
            while (true) {
                var iBuffer = buffer.slice(offset, offset + 255);
                buffers.push(Buffer.concat([Buffer.from([item.key, iBuffer.length]), iBuffer]));
                offset += iBuffer.length;
                if (offset + 1 >= buffer.length)
                    break;
            }
        }
        else
            buffers.push(Buffer.concat([Buffer.from([item.key, buffer.length]), buffer]));
    }
    return Buffer.concat(buffers);
}
exports.encodeTLV = encodeTLV;
function encodeTLVError(error, currentState) {
    return encodeTLV([
        {
            key: values_1.TLVValues.state,
            value: currentState + 1
        }, {
            key: values_1.TLVValues.error,
            value: error
        }
    ]);
}
exports.encodeTLVError = encodeTLVError;
