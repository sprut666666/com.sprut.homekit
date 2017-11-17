const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readInt8()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeInt8(100).readInt8()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeInt8(-100).readInt8()).to.equal(-100);
    });
});
