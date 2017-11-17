const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.buffer', function () {
    it('Empty buffer', function() {
        let buf1  = new ExtendedBuffer;
        let buf2 = Buffer.from([]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Not empty buffer', function() {
        let buf1  = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3]));
        let buf2 = Buffer.from([1, 2, 3]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
