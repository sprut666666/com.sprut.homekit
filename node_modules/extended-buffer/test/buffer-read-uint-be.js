const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readUIntBE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeUIntBE(1000, 4).readUIntBE(4)).to.equal(1000);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeUIntBE(2000, 4).readUIntBE(4)).to.equal(2000);
    });
});
