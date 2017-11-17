'use strict';

const MAX_BUFFER_LENGTH = require('buffer').kMaxLength;

class ExtendedBuffer
{
    /**
     * @param {Object} options
     */
    constructor (options) {
        options = options || {};
        this._maxBufferLength = options.maxBufferLength || MAX_BUFFER_LENGTH;
        this._initEmptyBuffer();
    }

    /**
     * @return {number}
     */
    static getMaxSize() {
        return MAX_BUFFER_LENGTH;
    }

    /**
     * @param {Array} list
     * @param {number} totalLength
     * @returns {ExtendedBuffer}
     */
    static concat(list, totalLength) {
        let buffer = new this;
        let listLength = list.length;

        for (let i = 0; i < listLength; ++i) {
            buffer.writeBuffer(list[i], false);

            if (undefined !== totalLength && buffer.length >= totalLength) {
                buffer._pointerEnd = buffer._pointerStart + totalLength;
                break;
            }
        }

        return buffer;
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
     * @returns {number}
     */
    get length() {
        return this._pointerEnd - this._pointerStart;
    }

    /**
     * @returns {number}
     */
    get nativeLength() {
        return this._nativeBuffer.length;
    }

    /**
     * @return {Buffer}
     */
    get buffer() {
        return this._nativeBuffer.slice(this._pointerStart, this._pointerEnd);
    }

    /**
     * @return {ExtendedBuffer}
     * @private
     */
    _initEmptyBuffer() {
        let startPointer = parseInt(this._maxBufferLength / 2, 10);
        this._nativeBuffer = Buffer.allocUnsafe(this._maxBufferLength);
        this._pointerStart = startPointer;
        this._pointerEnd = startPointer;
        this.pointer = 0;
        return this;
    }

    /**
     * @return {ExtendedBuffer}
     */
    clean() {
        return this._initEmptyBuffer();
    }

    /**
     * @return {number}
     */
    getFreeSpaceStart() {
        return this._pointerStart;
    }

    /**
     * @return {number}
     */
    getFreeSpaceEnd() {
        return this._nativeBuffer.length - this._pointerEnd;
    }

    /**
     * @return {number}
     */
    getFreeSpace() {
        return this.getFreeSpaceStart() + this.getFreeSpaceEnd();
    }

    /**
     * @param {number} byteLength
     * @return {ExtendedBuffer}
     */
    allocStart(byteLength) {
        byteLength = byteLength < 0 ? 0 : byteLength;

        if (byteLength > this.getFreeSpaceStart()) {
            if (byteLength > this.getFreeSpace()) {
                throw new RangeError('Not enough free space');
            }

            let offset = parseInt((this.getFreeSpace() - byteLength) / 2, 10) + byteLength - this._pointerStart;
            this._nativeBuffer.copy(this._nativeBuffer, this._pointerStart + offset, this._pointerStart, this._pointerEnd);
            this._pointerStart += offset;
            this._pointerEnd += offset;
            return this;
        }

        return this;
    }

    /**
     * @param {number} byteLength
     * @return {ExtendedBuffer}
     */
    allocEnd(byteLength) {
        byteLength = byteLength < 0 ? 0 : byteLength;

        if (byteLength > this.getFreeSpaceEnd()) {
            if (byteLength > this.getFreeSpace()) {
                throw new RangeError('Not enough free space');
            }

            let offset = this._nativeBuffer.length - parseInt((this.getFreeSpace() - byteLength) / 2, 10) - byteLength - this._pointerEnd;
            this._nativeBuffer.copy(this._nativeBuffer, this._pointerStart + offset, this._pointerStart, this._pointerEnd);
            this._pointerStart += offset;
            this._pointerEnd += offset;
            return this;
        }

        return this;
    }

    /**
     * @param {Buffer} buffer
     * @param {boolean} unshift
     * @return {ExtendedBuffer}
     * @private
     */
    _writeNativeBuffer(buffer, unshift) {
        if (unshift) {
            this.allocStart(buffer.length);
            this._pointerStart -= buffer.length;
            buffer.copy(this._nativeBuffer, this._pointerStart);
        } else {
            this.allocEnd(buffer.length);
            buffer.copy(this._nativeBuffer, this._pointerEnd);
            this._pointerEnd += buffer.length;
        }

        return this;
    }

    /**
     * Garbage Collector
     * @return {ExtendedBuffer}
     */
    gc() {
        if (this.pointer > 0) {
            let payload = this._nativeBuffer.slice(this._pointerStart + this.pointer, this._pointerEnd);
            return this._initEmptyBuffer()._writeNativeBuffer(payload, false);
        }

        return this;
    }

    /**
     * Node.js Garbage Collector
     * @return {ExtendedBuffer}
     */
    nodeGc() {
        if (global.gc) {
            global.gc();
        }

        return this;
    }

    /**
     * @param {number} pointer
     * @returns {ExtendedBuffer}
     */
    setPointer(pointer) {
        if (pointer >= 0 && pointer <= this.length) {
            this.pointer = pointer;
        } else {
            this.pointer = pointer < 0 ? 0 : this.length;
        }

        return this;
    }

    /**
     * @returns {number}
     */
    getPointer() {
        return this.pointer;
    }

    /**
     * @param {number} offset
     * @returns {ExtendedBuffer}
     */
    offset(offset) {
        return this.setPointer(this.pointer + offset);
    }

    /**
     * @param {number} byteLength
     * @returns {boolean}
     */
    isReadable(byteLength) {
        byteLength = byteLength < 1 ? 1 : byteLength;
        return this.getReadableSize() >= byteLength;
    }

    /**
     * @param {number} byteLength
     * @return {boolean}
     */
    isWritable(byteLength) {
        byteLength = byteLength < 1 ? 1 : byteLength;
        return this.getFreeSpace() >= byteLength;
    }

    /**
     * @returns {number}
     */
    getReadableSize() {
        return this._pointerEnd - this._pointerStart - this.pointer;
    }

    /**
     * @returns {number}
     */
    getWritableSize() {
        return this.getFreeSpace();
    }

    /**
     * @param {string} encoding
     * @param {number} start
     * @param {number} end
     * @returns {string}
     */
    toString(encoding, start, end) {
        return this.buffer.toString(encoding, start, end);
    }

    /**
     * @param {ExtendedBuffer|Buffer} value
     * @param {boolean} unshift
     * @returns {ExtendedBuffer}
     */
    writeBuffer(value, unshift) {
        if (value instanceof Buffer) {
            return this._writeNativeBuffer(value, unshift);
        } else if (value instanceof ExtendedBuffer) {
            return this._writeNativeBuffer(value.buffer, unshift);
        } else {
            throw new TypeError('"value" is incorrect buffer');
        }
    }

    /**
     * @param {string} string
     * @param {string} encoding
     * @param {boolean} unshift
     * @returns {ExtendedBuffer}
     */
    writeString(string, encoding, unshift) {
        let byteLength = Buffer.byteLength(string, encoding);

        if (unshift) {
            this.allocStart(byteLength);
            this._pointerStart -= byteLength;
            this._nativeBuffer.write(string, this._pointerStart, byteLength, encoding);
        } else {
            this.allocEnd(byteLength);
            this._nativeBuffer.write(string, this._pointerEnd, byteLength, encoding);
            this._pointerEnd += byteLength;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {number} byteLength
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @returns {ExtendedBuffer}
     */
    writeIntBE(value, byteLength, unshift, noAssert) {
        if (unshift) {
            this.allocStart(byteLength);
            this._pointerStart -= byteLength;
            this._nativeBuffer.writeIntBE(value, this._pointerStart, byteLength, noAssert);
        } else {
            this.allocEnd(byteLength);
            this._nativeBuffer.writeIntBE(value, this._pointerEnd, byteLength, noAssert);
            this._pointerEnd += byteLength;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {number} byteLength
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @returns {ExtendedBuffer}
     */
    writeIntLE(value, byteLength, unshift, noAssert) {
        if (unshift) {
            this.allocStart(byteLength);
            this._pointerStart -= byteLength;
            this._nativeBuffer.writeIntLE(value, this._pointerStart, byteLength, noAssert);
        } else {
            this.allocEnd(byteLength);
            this._nativeBuffer.writeIntLE(value, this._pointerEnd, byteLength, noAssert);
            this._pointerEnd += byteLength;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {number} byteLength
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @returns {ExtendedBuffer}
     */
    writeUIntBE(value, byteLength, unshift, noAssert) {
        if (unshift) {
            this.allocStart(byteLength);
            this._pointerStart -= byteLength;
            this._nativeBuffer.writeUIntBE(value, this._pointerStart, byteLength, noAssert);
        } else {
            this.allocEnd(byteLength);
            this._nativeBuffer.writeUIntBE(value, this._pointerEnd, byteLength, noAssert);
            this._pointerEnd += byteLength;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {number} byteLength
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @returns {ExtendedBuffer}
     */
    writeUIntLE(value, byteLength, unshift, noAssert) {
        if (unshift) {
            this.allocStart(byteLength);
            this._pointerStart -= byteLength;
            this._nativeBuffer.writeUIntLE(value, this._pointerStart, byteLength, noAssert);
        } else {
            this.allocEnd(byteLength);
            this._nativeBuffer.writeUIntLE(value, this._pointerEnd, byteLength, noAssert);
            this._pointerEnd += byteLength;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeInt8(value, unshift, noAssert) {
        return this.writeIntBE(value, 1, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeUInt8(value, unshift, noAssert) {
        return this.writeUIntBE(value, 1, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeInt16BE(value, unshift, noAssert) {
        return this.writeIntBE(value, 2, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeInt16LE(value, unshift, noAssert) {
        return this.writeIntLE(value, 2, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeUInt16BE(value, unshift, noAssert) {
        return this.writeUIntBE(value, 2, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeUInt16LE(value, unshift, noAssert) {
        return this.writeUIntLE(value, 2, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeInt32BE(value, unshift, noAssert) {
        return this.writeIntBE(value, 4, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeInt32LE(value, unshift, noAssert) {
        return this.writeIntLE(value, 4, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeUInt32BE(value, unshift, noAssert) {
        return this.writeUIntBE(value, 4, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeUInt32LE(value, unshift, noAssert) {
        return this.writeUIntLE(value, 4, unshift, noAssert);
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeFloatBE(value, unshift, noAssert) {
        if (unshift) {
            this.allocStart(4);
            this._pointerStart -= 4;
            this._nativeBuffer.writeFloatBE(value, this._pointerStart, noAssert);
        } else {
            this.allocEnd(4);
            this._nativeBuffer.writeFloatBE(value, this._pointerEnd, noAssert);
            this._pointerEnd += 4;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeFloatLE(value, unshift, noAssert) {
        if (unshift) {
            this.allocStart(4);
            this._pointerStart -= 4;
            this._nativeBuffer.writeFloatLE(value, this._pointerStart, noAssert);
        } else {
            this.allocEnd(4);
            this._nativeBuffer.writeFloatLE(value, this._pointerEnd, noAssert);
            this._pointerEnd += 4;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeDoubleBE(value, unshift, noAssert) {
        if (unshift) {
            this.allocStart(8);
            this._pointerStart -= 8;
            this._nativeBuffer.writeDoubleBE(value, this._pointerStart, noAssert);
        } else {
            this.allocEnd(8);
            this._nativeBuffer.writeDoubleBE(value, this._pointerEnd, noAssert);
            this._pointerEnd += 8;
        }

        return this;
    }

    /**
     * @param {number} value
     * @param {boolean} unshift
     * @param {boolean} noAssert
     * @return {ExtendedBuffer}
     */
    writeDoubleLE(value, unshift, noAssert) {
        if (unshift) {
            this.allocStart(8);
            this._pointerStart -= 8;
            this._nativeBuffer.writeDoubleLE(value, this._pointerStart, noAssert);
        } else {
            this.allocEnd(8);
            this._nativeBuffer.writeDoubleLE(value, this._pointerEnd, noAssert);
            this._pointerEnd += 8;
        }

        return this;
    }

    /**
     * https://github.com/dcodeIO/bytebuffer.js/blob/f3f310b6786e5d44686d385a2cc60c6720a1069b/src/types/varints/varint32.js
     * @param {number} value
     * @param {boolean} unshift
     * @returns {ExtendedBuffer}
     */
    writeVarInt32(value, unshift) {
        value >>>= 0;
        let b;

        if (unshift) {
            let buffer = new this.constructor({
                maxBufferLength: 10
            });

            while (value >= 0x80) {
                b = (value & 0x7f) | 0x80;
                buffer.writeUIntBE(b, 1);
                value >>>= 7;
            }

            buffer.writeUIntBE(value, 1);
            return this._writeNativeBuffer(buffer.buffer, true);
        }

        while (value >= 0x80) {
            b = (value & 0x7f) | 0x80;
            this.writeUIntBE(b, 1);
            value >>>= 7;
        }

        return this.writeUIntBE(value, 1);
    }

    /**
     * @param {number} size
     * @param {boolean} asNative
     * @param {Object} bufferOptions
     * @returns {ExtendedBuffer|Buffer}
     */
    readBuffer(size, asNative, bufferOptions) {
        let buffer = this._nativeBuffer.slice(this._pointerStart + this.pointer, this._pointerStart + this.pointer + size);
        this.pointer += size;
        return asNative ? Buffer.from(buffer) : (new this.constructor(bufferOptions))._writeNativeBuffer(buffer, false);
    }

    /**
     * @param {number} size
     * @param {string} encoding
     * @returns {string}
     */
    readString(size, encoding) {
        this.pointer += size;
        return this._nativeBuffer.toString(encoding, this._pointerStart + this.pointer - size, this._pointerStart + this.pointer);
    }

    /**
     * @param {number} byteLength
     * @param {boolean} noAssert
     * @returns {number}
     */
    readIntBE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this._nativeBuffer.readIntBE(this._pointerStart + this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param {number} byteLength
     * @param {boolean} noAssert
     * @returns {number}
     */
    readIntLE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this._nativeBuffer.readIntLE(this._pointerStart + this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param {number} byteLength
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUIntBE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this._nativeBuffer.readUIntBE(this._pointerStart + this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param {number} byteLength
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUIntLE(byteLength, noAssert) {
        this.pointer += byteLength;
        return this._nativeBuffer.readUIntLE(this._pointerStart + this.pointer - byteLength, byteLength, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readInt8(noAssert) {
        return this.readIntBE(1, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUInt8(noAssert) {
        return this.readUIntBE(1, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readInt16BE(noAssert) {
        return this.readIntBE(2, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readInt16LE(noAssert) {
        return this.readIntLE(2, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUInt16BE(noAssert) {
        return this.readUIntBE(2, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUInt16LE(noAssert) {
        return this.readUIntLE(2, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readInt32BE(noAssert) {
        return this.readIntBE(4, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readInt32LE(noAssert) {
        return this.readIntLE(4, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUInt32BE(noAssert) {
        return this.readUIntBE(4, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readUInt32LE(noAssert) {
        return this.readUIntLE(4, noAssert);
    }

    /**
     * @param  {boolean}noAssert
     * @returns {number}
     */
    readFloatBE(noAssert) {
        this.pointer += 4;
        return this._nativeBuffer.readFloatBE(this._pointerStart + this.pointer - 4, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readFloatLE(noAssert) {
        this.pointer += 4;
        return this._nativeBuffer.readFloatLE(this._pointerStart + this.pointer - 4, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readDoubleBE(noAssert) {
        this.pointer += 8;
        return this._nativeBuffer.readDoubleBE(this._pointerStart + this.pointer - 8, noAssert);
    }

    /**
     * @param {boolean} noAssert
     * @returns {number}
     */
    readDoubleLE(noAssert) {
        this.pointer += 8;
        return this._nativeBuffer.readDoubleLE(this._pointerStart + this.pointer - 8, noAssert);
    }

    /**
     * https://github.com/dcodeIO/bytebuffer.js/blob/f3f310b6786e5d44686d385a2cc60c6720a1069b/src/types/varints/varint32.js
     * @returns {number}
     */
    readVarInt32() {
        let c = 0;
        let value = 0 >>> 0;
        let b;

        do {
            b = this.readUIntBE(1);
            if (c < 5) {
                value |= (b & 0x7f) << (7 * c);
            }
            ++c;
        } while ((b & 0x80) !== 0);

        return value | 0;
    }

    /**
     * @return {boolean}
     */
    isReadableVarInt32() {
        let c = 0;
        let value = 0 >>> 0;
        let b;
        let oldPointer = this.pointer;

        do {
            if (!this.isReadable(1)) {
                this.pointer = oldPointer;
                return false;
            }
            b = this.readUIntBE(1);
            if (c < 5) {
                value |= (b & 0x7f) << (7 * c);
            }
            ++c;
        } while ((b & 0x80) !== 0);

        this.pointer = oldPointer;
        return true;
    }
}

module.exports = ExtendedBuffer;
