const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeFloatLE()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeFloatLE(1000).writeFloatLE(2000);
        let buf2 = Buffer.alloc(8);
        buf2.writeFloatLE(1000, 0);
        buf2.writeFloatLE(2000, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeFloatLE(1000).writeFloatLE(2000, true);
        let buf2 = Buffer.alloc(8);
        buf2.writeFloatLE(2000, 0);
        buf2.writeFloatLE(1000, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
