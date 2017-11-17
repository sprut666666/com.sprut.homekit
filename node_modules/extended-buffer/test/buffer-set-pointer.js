const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.setPointer()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer;
        buffer.setPointer(-1);
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #2', function() {
        let buffer = new ExtendedBuffer;
        buffer.setPointer(1);
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #3', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.setPointer(-1);
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #4', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.setPointer(10);
        expect(buffer.pointer).to.equal(4);
    });

    it('Test #5', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1);
        buffer.setPointer(3);
        expect(buffer.pointer).to.equal(3);
    });
});
