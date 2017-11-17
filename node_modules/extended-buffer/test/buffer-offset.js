const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.offset()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer;
        buffer.offset(-1);
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #2', function() {
        let buffer = new ExtendedBuffer;
        buffer.offset(1);
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #3', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.offset(-1);
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #4', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.offset(10);
        expect(buffer.pointer).to.equal(4);
    });

    it('Test #5', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.offset(3);
        expect(buffer.pointer).to.equal(3);
    });

    it('Test #6', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.offset(3).readUInt8();
        expect(buffer.pointer).to.equal(4);
    });
});
