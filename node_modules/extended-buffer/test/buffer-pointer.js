const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.pointer', function () {
    it('Test #1', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3]));
        expect(buffer.pointer).to.equal(0);
    });

    it('Test #2', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3]));
        buffer.readUInt8();
        expect(buffer.pointer).to.equal(1);
    });

    it('Test #3', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3]));
        buffer.readUInt16BE();
        expect(buffer.pointer).to.equal(2);
    });
});
