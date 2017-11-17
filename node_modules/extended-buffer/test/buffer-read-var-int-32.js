const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readVarInt32()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeVarInt32(100).readVarInt32()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeVarInt32(-100).readVarInt32()).to.equal(-100);
    });
});
