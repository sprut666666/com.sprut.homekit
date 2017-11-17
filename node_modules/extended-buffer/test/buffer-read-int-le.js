const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readIntLE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeIntLE(1000, 4).readIntLE(4)).to.equal(1000);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeIntLE(-1000, 4).readIntLE(4)).to.equal(-1000);
    });
});
