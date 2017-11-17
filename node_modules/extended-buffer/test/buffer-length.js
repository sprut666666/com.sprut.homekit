const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.length', function () {
    it('Empty buffer', function() {
        let buffer = new ExtendedBuffer;
        expect(buffer.length).to.equal(0);
    });

    it('After writeUInt8()', function() {
        let buffer = (new ExtendedBuffer).writeUInt8(1);
        expect(buffer.length).to.equal(1);
    });

    it('After writeUInt16BE()', function() {
        let buffer = (new ExtendedBuffer).writeUInt16BE(1);
        expect(buffer.length).to.equal(2);
    });

    it('After writeUInt32BE()', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        expect(buffer.length).to.equal(4);
    });
});
