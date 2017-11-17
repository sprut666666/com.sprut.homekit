const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('ExtendedBuffer.zigZagEncode32()', function () {
    it('Test #1', function() {
        expect(ExtendedBuffer.zigZagEncode32(7)).to.equal(14);
    });

    it('Test #2', function() {
        expect(ExtendedBuffer.zigZagEncode32(77)).to.equal(154);
    });

    it('Test #3', function() {
        expect(ExtendedBuffer.zigZagEncode32(777)).to.equal(1554);
    });

    it('Test #4', function() {
        expect(ExtendedBuffer.zigZagEncode32(7777)).to.equal(15554);
    });

    it('Test #5', function() {
        expect(ExtendedBuffer.zigZagEncode32(77777)).to.equal(155554);
    });
});
