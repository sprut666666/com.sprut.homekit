const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readInt16LE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeInt16LE(100).readInt16LE()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeInt16LE(-100).readInt16LE()).to.equal(-100);
    });
});
