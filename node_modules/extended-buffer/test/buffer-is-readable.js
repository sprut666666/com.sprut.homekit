const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.isReadable()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer;
        expect(buffer.isReadable(0)).to.equal(false);
    });

    it('Test #2', function() {
        let buffer = new ExtendedBuffer;
        expect(buffer.isReadable(1)).to.equal(false);
    });

    it('Test #3', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        expect(buffer.isReadable(1)).to.equal(true);
    });

    it('Test #4', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        expect(buffer.isReadable(4)).to.equal(true);
    });

    it('Test #5', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        expect(buffer.isReadable(5)).to.equal(false);
    });
});
