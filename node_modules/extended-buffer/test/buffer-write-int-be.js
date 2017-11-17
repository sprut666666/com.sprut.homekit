const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeIntBE()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeIntBE(111, 4).writeIntBE(222, 4);
        let buf2 = Buffer.alloc(8);
        buf2.writeIntBE(111, 0, 4);
        buf2.writeIntBE(222, 4, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeIntBE(111, 4).writeIntBE(222, 4, true);
        let buf2 = Buffer.alloc(8);
        buf2.writeIntBE(222, 0, 4);
        buf2.writeIntBE(111, 4, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
