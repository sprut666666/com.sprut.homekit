const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readUInt32BE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeUInt32BE(100).readUInt32BE()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeUInt32BE(200).readUInt32BE()).to.equal(200);
    });
});
