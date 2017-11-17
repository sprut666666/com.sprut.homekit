const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readDoubleLE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeDoubleLE(100).readDoubleLE()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeDoubleLE(-100).readDoubleLE()).to.equal(-100);
    });
});
