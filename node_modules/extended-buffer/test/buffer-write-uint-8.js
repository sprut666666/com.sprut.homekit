const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeUInt8()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeUInt8(100).writeUInt8(200);
        let buf2 = Buffer.alloc(2);
        buf2.writeUInt8(100, 0);
        buf2.writeUInt8(200, 1);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeUInt8(100).writeUInt8(200, true);
        let buf2 = Buffer.alloc(2);
        buf2.writeUInt8(200, 0);
        buf2.writeUInt8(100, 1);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
