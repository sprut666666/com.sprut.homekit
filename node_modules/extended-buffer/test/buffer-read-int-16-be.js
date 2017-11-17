const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readInt16BE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeInt16BE(100).readInt16BE()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeInt16BE(-100).readInt16BE()).to.equal(-100);
    });
});
