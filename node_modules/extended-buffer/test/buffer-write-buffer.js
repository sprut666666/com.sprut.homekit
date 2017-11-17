const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeBuffer()', function () {
    it('Incorrect value', function() {
        let buffer = new ExtendedBuffer;
        expect(function () {
            buffer.writeBuffer(123);
        }).to.throw('"value" is incorrect buffer');
    });

    it('Native', function() {
        let buf1 = (new ExtendedBuffer).writeBuffer(Buffer.from([3, 2, 1]));
        let buf2 = Buffer.from([3, 2, 1]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('ExtendedBuffer', function() {
        let buf1 = (new ExtendedBuffer).writeBuffer(
            (new ExtendedBuffer).writeBuffer(Buffer.from([3, 2, 1]))
        );
        let buf2 = Buffer.from([3, 2, 1]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
