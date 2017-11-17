[![npm version](https://badge.fury.io/js/extended-buffer.svg)](https://badge.fury.io/js/extended-buffer)
# node-extended-buffer
Node JS extended Buffer

### Install
```bash
npm install extended-buffer --save
```

### Class methods:
###### ExtendedBuffer.getMaxSize()
###### ExtendedBuffer.concat(list[, totalLength])
###### ExtendedBuffer.zigZagEncode32(value)
###### ExtendedBuffer.zigZagDecode32(value)

### Instance properties:
###### buffer.length - Buffer size
###### buffer.nativeLength - Native buffer size
###### buffer.buffer - Instance of Buffer class
###### buffer.pointer - Current offset for buffer
###### buffer._nativeBuffer - Native buffer
###### buffer._pointerStart
###### buffer._pointerEnd
###### buffer._maxBufferLength

### Instance methods:
###### buffer._initEmptyBuffer()
###### buffer.clean()
###### buffer.getFreeSpaceStart()
###### buffer.getFreeSpaceEnd()
###### buffer.getFreeSpace()
###### buffer.allocStart(byteLength)
###### buffer.allocEnd(byteLength)
###### buffer._writeNativeBuffer(buffer[, unshift])
###### buffer.gc()
###### buffer.nodeGc()
###### buffer.setPointer(value)
###### buffer.getPointer()
###### buffer.offset(value)
###### buffer.isReadable([byteLength])
###### buffer.isWritable([byteLength])
###### buffer.getReadableSize()
###### buffer.getWritableSize()
###### buffer.toString([encoding[, start[, end]]])
###### buffer.writeBuffer(value[, unshift])
###### buffer.writeString([value[, encoding[, unshift]]])
###### buffer.writeIntBE(value, byteLength[, unshift[, noAssert]])
###### buffer.writeIntLE(value, byteLength[, unshift[, noAssert]])
###### buffer.writeUIntBE(value, byteLength[, unshift[, noAssert]])
###### buffer.writeUIntLE(value, byteLength[, unshift[, noAssert]])
###### buffer.writeInt8(value[, unshift[, noAssert]])
###### buffer.writeUInt8(value[, unshift[, noAssert]])
###### buffer.writeInt16BE(value[, unshift[, noAssert]])
###### buffer.writeInt16LE(value[, unshift[, noAssert]])
###### buffer.writeUInt16BE(value[, unshift[, noAssert]])
###### buffer.writeUInt16LE(value[, unshift[, noAssert]])
###### buffer.writeInt32BE(value[, unshift[, noAssert]])
###### buffer.writeInt32LE(value[, unshift[, noAssert]])
###### buffer.writeUInt32BE(value[, unshift[, noAssert]])
###### buffer.writeUInt32LE(value[, unshift[, noAssert]])
###### buffer.writeInt8(value[, unshift[, noAssert]])
###### buffer.writeFloatBE(value[, unshift[, noAssert]])
###### buffer.writeFloatLE(value[, unshift[, noAssert]])
###### buffer.writeDoubleBE(value[, unshift[, noAssert]])
###### buffer.writeDoubleLE(value[, unshift[, noAssert]])
###### buffer.writeVarInt32(value[, unshift])
###### buffer.readBuffer(size[, asNative])
###### buffer.readString(size[, encoding])
###### buffer.readIntBE(byteLength[, noAssert])
###### buffer.readIntLE(byteLength[, noAssert])
###### buffer.readUIntBE(byteLength[, noAssert])
###### buffer.readUIntLE(byteLength[, noAssert])
###### buffer.readInt8([noAssert])
###### buffer.readUInt8([noAssert])
###### buffer.readInt16BE([noAssert])
###### buffer.readInt16LE([noAssert])
###### buffer.readUInt16BE([noAssert])
###### buffer.readUInt16LE([noAssert])
###### buffer.readInt32BE([noAssert])
###### buffer.readInt32LE([noAssert])
###### buffer.readUInt32BE([noAssert])
###### buffer.readUInt32LE([noAssert])
###### buffer.readFloatBE([noAssert])
###### buffer.readFloatLE([noAssert])
###### buffer.readDoubleBE([noAssert])
###### buffer.readDoubleLE([noAssert])
###### buffer.readVarInt32()
###### buffer.isReadableVarInt32()

### Example 1:
```js
const ExtendedBuffer = require('extended-buffer');
let buffer = new ExtendedBuffer;
console.log(buffer.length); // 0
buffer.writeInt32LE(123).writeInt32LE(456).writeInt32LE(789);
console.log(buffer.length); // 12

console.log(buffer.readInt32LE()); // 123
console.log(buffer.readInt32LE()); // 456
console.log(buffer.readInt32LE()); // 789
```
