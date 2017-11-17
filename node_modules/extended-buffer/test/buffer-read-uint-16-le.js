const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readUInt16LE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeUInt16LE(100).readUInt16LE()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeUInt16LE(200).readUInt16LE()).to.equal(200);
    });
});
