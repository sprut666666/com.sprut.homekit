const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeFloatBE()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeFloatBE(1000).writeFloatBE(2000);
        let buf2 = Buffer.alloc(8);
        buf2.writeFloatBE(1000, 0);
        buf2.writeFloatBE(2000, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeFloatBE(1000).writeFloatBE(2000, true);
        let buf2 = Buffer.alloc(8);
        buf2.writeFloatBE(2000, 0);
        buf2.writeFloatBE(1000, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
