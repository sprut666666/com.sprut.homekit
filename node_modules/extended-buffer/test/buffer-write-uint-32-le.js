const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeUInt32LE()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeUInt32LE(1000).writeUInt32LE(2000);
        let buf2 = Buffer.alloc(8);
        buf2.writeUInt32LE(1000, 0);
        buf2.writeUInt32LE(2000, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeUInt32LE(1000).writeUInt32LE(2000, true);
        let buf2 = Buffer.alloc(8);
        buf2.writeUInt32LE(2000, 0);
        buf2.writeUInt32LE(1000, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
