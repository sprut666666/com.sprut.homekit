const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.getWritableSize()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        expect(buffer.getWritableSize()).to.equal(10);
    });

    it('Test #2', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt32BE(1);
        expect(buffer.getWritableSize()).to.equal(6);
    });

    it('Test #3', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt32BE(1).writeUInt32BE(1).writeUInt16BE(1);
        expect(buffer.getWritableSize()).to.equal(0);
    });
});
