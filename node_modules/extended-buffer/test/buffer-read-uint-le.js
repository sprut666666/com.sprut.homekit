const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readUIntLE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeUIntLE(1000, 4).readUIntLE(4)).to.equal(1000);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeUIntLE(2000, 4).readUIntLE(4)).to.equal(2000);
    });
});
