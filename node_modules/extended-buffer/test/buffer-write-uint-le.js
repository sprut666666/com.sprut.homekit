const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeUIntLE()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeUIntLE(111, 4).writeUIntLE(222, 4);
        let buf2 = Buffer.alloc(8);
        buf2.writeUIntLE(111, 0, 4);
        buf2.writeUIntLE(222, 4, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeUIntLE(111, 4).writeUIntLE(222, 4, true);
        let buf2 = Buffer.alloc(8);
        buf2.writeUIntLE(222, 0, 4);
        buf2.writeUIntLE(111, 4, 4);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
