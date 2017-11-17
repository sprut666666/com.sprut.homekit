const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.isReadableVarInt32()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeVarInt32(100).isReadableVarInt32()).to.equal(true);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeVarInt32(-100).isReadableVarInt32()).to.equal(true);
    });

    it('Test #3', function() {
        expect((new ExtendedBuffer).writeInt8(-100).isReadableVarInt32()).to.equal(false);
    });
});
