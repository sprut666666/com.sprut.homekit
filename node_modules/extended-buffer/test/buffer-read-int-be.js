const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readIntBE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeIntBE(1000, 4).readIntBE(4)).to.equal(1000);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeIntBE(-1000, 4).readIntBE(4)).to.equal(-1000);
    });
});
