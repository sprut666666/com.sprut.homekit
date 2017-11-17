const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.readFloatLE()', function () {
    it('Test #1', function() {
        expect((new ExtendedBuffer).writeFloatLE(100).readFloatLE()).to.equal(100);
    });

    it('Test #2', function() {
        expect((new ExtendedBuffer).writeFloatLE(-100).readFloatLE()).to.equal(-100);
    });
});
