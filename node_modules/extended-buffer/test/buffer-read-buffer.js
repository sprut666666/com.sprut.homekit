const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readBuffer()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3, 4, 5]));
        let buf2 = Buffer.from([1, 2, 3]);
        expect(Buffer.compare(buf1.readBuffer(3).buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3, 4, 5])).offset(3);
        let buf2 = Buffer.from([4, 5]);
        expect(Buffer.compare(buf1.readBuffer(2).buffer, buf2)).to.equal(0);
    });

    it('Test #3', function() {
        let buf1 = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3, 4, 5]));
        let buf2 = Buffer.from([1, 2, 3]);
        expect(Buffer.compare(buf1.readBuffer(3, true), buf2)).to.equal(0);
    });

    it('Test #4', function() {
        let buf1 = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3, 4, 5])).offset(3);
        let buf2 = Buffer.from([4, 5]);
        expect(Buffer.compare(buf1.readBuffer(2, true), buf2)).to.equal(0);
    });
});
