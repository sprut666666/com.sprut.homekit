const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeDoubleBE()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeDoubleBE(1000).writeDoubleBE(-2000);
        let buf2 = Buffer.alloc(16);
        buf2.writeDoubleBE(1000, 0);
        buf2.writeDoubleBE(-2000, 8);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeDoubleBE(1000).writeDoubleBE(-2000, true);
        let buf2 = Buffer.alloc(16);
        buf2.writeDoubleBE(-2000, 0);
        buf2.writeDoubleBE(1000, 8);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
