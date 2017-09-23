'use strict';

class ExtendedBuffer {
    /**
     * @param input
     */
    constructor (input) {
        this.buffer = Buffer.from((input instanceof Buffer) ? input : []);
        this.pointer = 0;
    }

    /**
     * @returns {number}
     */
    get length() {
        return this.buffer.length;
    }

    /**
     * @returns {ExtendedBuffer}
     */
    static from() {
        if (arguments[0] instanceof ExtendedBuffer) {
            arguments[0] = arguments[0].buffer;
        }
        return new ExtendedBuffer(Buffer.from.apply(Buffer, arguments));
    }

    /**
     * @param list
     * @param totalLength
     * @returns {ExtendedBuffer}
     */
    static concat(list, totalLength) {
        let result = Buffer.alloc(0);
        for (let i = 0; i < list.length; i++) {
            if (list[i] instanceof ExtendedBuffer && list[i].buffer instanceof Buffer) {
                result = Buffer.concat([result, list[i].buffer]);
            } else if (list[i] instanceof Buffer) {
                result = Buffer.concat([result, list[i]]);
            } else {
                throw new TypeError('"list" have incorrect value');
            }
            if (totalLength && result.length >= totalLength) {
                break;
            }
        }
        return new ExtendedBuffer(result.slice(0, totalLength));
    }

    /**
     * https://github.com/dcodeIO/bytebuffer.js/blob/f3f310b6786e5d44686d385a2cc60c6720a1069b/src/types/varints/varint32.js
     * @param {number} value Signed 32bit integer
     * @returns {number} Unsigned zigzag encoded 32bit integer
     */
    static zigZagEncode32(value) {
        return (((value |= 0) << 1) ^ (value >> 31)) >>> 0;
    }

    /**
     * https://github.com/dcodeIO/bytebuffer.js/blob/f3f310b6786e5d44686d385a2cc60c6720a1069b/src/types/varints/varint32.js
     * @param {number} value Unsigned zigzag encoded 32bit integer
     * @returns {number} Signed 32bit integer
     */
    static zigZagDecode32(value) {
        return ((value >>> 1) ^ -(value & 1)) | 0;
    }

    /**
     * @param pointer
     * @returns {ExtendedBuffer}
     */
    setPointer(pointer) {
        this.pointer = parseInt(pointer) || 0;
        this.pointer = this.pointer < 0 ? this.buffer.length + this.pointer : pointer;
        this.pointer = this.pointer < 0 ? 0 : this.pointer;
        return this;
    }

    /**
     * @returns {number}
     */
    getPointer(){
        return this.pointer;
    }

    /**
     * @param offset
     * @returns {ExtendedBuffer}
     */
    offset(offset) {
        this.pointer += parseInt(offset) || 0;
        return this;
    }

    /**
     * @param needBytes
     * @returns {boolean}
     */
    isReadable(needBytes) {
        needBytes = parseInt(needBytes) || 0;
        needBytes = needBytes < 1 ? 1 : needBytes;
        return (this.pointer + needBytes) <= this.buffer.length;
    }

    /**
     * @param encoding
     * @param start
     * @param end
     * @returns {string}
     */
    toString(encoding, start, end) {
        return this.buffer.toString(encoding, start, end);
    }

    /**
     * @param value
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeBuffer(value, unshift) {
        if (value instanceof ExtendedBuffer && value.buffer instanceof Buffer) {
            this.buffer = Buffer.concat(unshift ? [value.buffer, this.buffer] : [this.buffer, value.buffer]);
        } else if (value instanceof Buffer) {
            this.buffer = Buffer.concat(unshift ? [value, this.buffer] : [this.buffer, value]);
        } else {
            throw new TypeError('"value" is incorrect buffer');
        }
        return this;
    }

    /**
     * @param value
     * @param encoding
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeString(value, encoding, unshift) {
        return this.writeBuffer(Buffer.from(value, encoding), unshift);
    }

    /**
     * @param value
     * @param byteLength
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeIntBE(value, byteLength, noAssert, unshift) {
        let buffer = Buffer.alloc(byteLength);
        buffer.writeIntBE(value, 0, byteLength, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param byteLength
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeIntLE(value, byteLength, noAssert, unshift) {
        let buffer = Buffer.alloc(byteLength);
        buffer.writeIntLE(value, 0, byteLength, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param byteLength
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUIntBE(value, byteLength, noAssert, unshift) {
        let buffer = Buffer.alloc(byteLength);
        buffer.writeUIntBE(value, 0, byteLength, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param byteLength
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUIntLE(value, byteLength, noAssert, unshift) {
        let buffer = Buffer.alloc(byteLength);
        buffer.writeUIntLE(value, 0, byteLength, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt8(value, noAssert, unshift) {
        return this.writeIntBE(value, 1, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt8(value, noAssert, unshift) {
        return this.writeUIntBE(value, 1, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt16BE(value, noAssert, unshift) {
        return this.writeIntBE(value, 2, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt16LE(value, noAssert, unshift) {
        return this.writeIntLE(value, 2, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt16BE(value, noAssert, unshift) {
        return this.writeUIntBE(value, 2, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt16LE(value, noAssert, unshift) {
        return this.writeUIntLE(value, 2, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt32BE(value, noAssert, unshift) {
        return this.writeIntBE(value, 4, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt32LE(value, noAssert, unshift) {
        return this.writeIntLE(value, 4, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt32BE(value, noAssert, unshift) {
        return this.writeUIntBE(value, 4, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt32LE(value, noAssert, unshift) {
        return this.writeUIntLE(value, 4, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt64BE(value, noAssert, unshift) {
        return this.writeIntBE(value, 8, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeInt64LE(value, noAssert, unshift) {
        return this.writeIntLE(value, 8, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt64BE(value, noAssert, unshift) {
        return this.writeUIntBE(value, 8, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeUInt64LE(value, noAssert, unshift) {
        return this.writeUIntLE(value, 8, noAssert, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeFloatBE(value, noAssert, unshift) {
        let buffer = Buffer.alloc(4);
        buffer.writeFloatBE(value, 0, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeFloatLE(value, noAssert, unshift) {
        let buffer = Buffer.alloc(4);
        buffer.writeFloatLE(value, 0, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeDoubleBE(value, noAssert, unshift) {
        let buffer = Buffer.alloc(8);
        buffer.writeDoubleBE(value, 0, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param value
     * @param noAssert
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeDoubleLE(value, noAssert, unshift) {
        let buffer = Buffer.alloc(8);
        buffer.writeDoubleLE(value, 0, noAssert);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * https://github.com/dcodeIO/bytebuffer.js/blob/f3f310b6786e5d44686d385a2cc60c6720a1069b/src/types/varints/varint32.js
     * @param value
     * @param unshift
     * @returns {ExtendedBuffer}
     */
    writeVarInt32(value, unshift) {
        value = parseInt(value) || 0;
        value >>>= 0;
        let b;
        let buffer = new ExtendedBuffer;
        while (value >= 0x80) {
            b = (value & 0x7f) | 0x80;
            buffer.writeUInt8(b);
            value >>>= 7;
        }
        buffer.writeUInt8(value);
        return this.writeBuffer(buffer, unshift);
    }

    /**
     * @param size
     * @param asNative
     * @returns {ExtendedBuffer|Buffer}
     */
    readBuffer(size, asNative) {
        this.pointer += size;
        if (asNative) {
            return Buffer.from(this.buffer.slice(this.pointer - size, this.pointer));
        }
        return new ExtendedBuffer(this.buffer.slice(this.pointer - size, this.pointer));
    }

    /**
     * @param size
     * @param encoding
     * @returns {string}
     */
    readString(size, encoding) {
        this.pointer += size;
        return this.buffer.toString(encoding, this.pointer - size, this.pointer);
    }

    /**
     * @param byteLength
     * @param noAssert
     * @returns {number}
     */
    readIntBE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this.buffer.readIntBE(this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param byteLength
     * @param noAssert
     * @returns {number}
     */
    readIntLE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this.buffer.readIntLE(this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param byteLength
     * @param noAssert
     * @returns {number}
     */
    readUIntBE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this.buffer.readUIntBE(this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param byteLength
     * @param noAssert
     * @returns {number}
     */
    readUIntLE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this.buffer.readUIntLE(this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt8(noAssert) {
        return this.readIntBE(1, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt8(noAssert) {
        return this.readUIntBE(1, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt16BE(noAssert) {
        return this.readIntBE(2, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt16LE(noAssert) {
        return this.readIntLE(2, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt16BE(noAssert) {
        return this.readUIntBE(2, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt16LE(noAssert) {
        return this.readUIntLE(2, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt32BE(noAssert) {
        return this.readIntBE(4, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt32LE(noAssert) {
        return this.readIntLE(4, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt32BE(noAssert) {
        return this.readUIntBE(4, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt32LE(noAssert) {
        return this.readUIntLE(4, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt64BE(noAssert) {
        return this.readIntBE(8, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readInt64LE(noAssert) {
        return this.readIntLE(8, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt64BE(noAssert) {
        return this.readUIntBE(8, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readUInt64LE(noAssert) {
        return this.readUIntLE(8, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readFloatBE(noAssert) {
        this.pointer += 4;
        return this.buffer.readFloatBE(this.pointer - 4, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readFloatLE(noAssert) {
        this.pointer += 4;
        return this.buffer.readFloatLE(this.pointer - 4, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readDoubleBE(noAssert) {
        this.pointer += 8;
        return this.buffer.readDoubleBE(this.pointer - 8, noAssert);
    }

    /**
     * @param noAssert
     * @returns {number}
     */
    readDoubleLE(noAssert) {
        this.pointer += 8;
        return this.buffer.readDoubleLE(this.pointer - 8, noAssert);
    }

    /**
     * https://github.com/dcodeIO/bytebuffer.js/blob/f3f310b6786e5d44686d385a2cc60c6720a1069b/src/types/varints/varint32.js
     * @returns {number}
     */
    readVarInt32() {
        let c = 0,
            value = 0 >>> 0,
            b;
        do {
            b = this.readUInt8();
            if (c < 5) {
                value |= (b & 0x7f) << (7*c);
            }
            ++c;
        } while ((b & 0x80) !== 0);
        return value | 0;
    }
}

module.exports = ExtendedBuffer;
