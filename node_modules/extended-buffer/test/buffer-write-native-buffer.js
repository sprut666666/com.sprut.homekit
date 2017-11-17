const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer._writeNativeBuffer()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer)._writeNativeBuffer(Buffer.from([1, 1, 1]))._writeNativeBuffer(Buffer.from([2, 2, 2]));
        let buf2 = Buffer.from([1, 1, 1, 2, 2, 2]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer)._writeNativeBuffer(Buffer.from([1, 1, 1]))._writeNativeBuffer(Buffer.from([2, 2, 2]), true);
        let buf2 = Buffer.from([2, 2, 2, 1, 1, 1]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
