const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.gc()', function () {
    it('Test #1', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1).writeUInt32BE(1);
        buffer.gc();
        expect(buffer.length).to.equal(8);
    });

    it('Test #2', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1).writeUInt32BE(1);
        buffer.offset(5).gc();
        expect(buffer.length).to.equal(3);
    });

    it('Test #3', function() {
        let buffer = (new ExtendedBuffer).writeUInt32BE(1).writeUInt32BE(1);
        buffer.offset(5).gc();
        expect(buffer.pointer).to.equal(0);
    });
});
