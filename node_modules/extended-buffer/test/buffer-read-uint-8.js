const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readUInt8()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeUInt8(100).readUInt8()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeUInt8(200).readUInt8()).to.equal(200);
    });
});
