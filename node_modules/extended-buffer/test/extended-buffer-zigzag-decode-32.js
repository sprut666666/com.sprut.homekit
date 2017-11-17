const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('ExtendedBuffer.zigZagDecode32()', function () {
    it('Test #1', function() {
        expect(ExtendedBuffer.zigZagDecode32(14)).to.equal(7);
    });

    it('Test #2', function() {
        expect(ExtendedBuffer.zigZagDecode32(154)).to.equal(77);
    });

    it('Test #3', function() {
        expect(ExtendedBuffer.zigZagDecode32(1554)).to.equal(777);
    });

    it('Test #4', function() {
        expect(ExtendedBuffer.zigZagDecode32(15554)).to.equal(7777);
    });

    it('Test #5', function() {
        expect(ExtendedBuffer.zigZagDecode32(155554)).to.equal(77777);
    });
});
