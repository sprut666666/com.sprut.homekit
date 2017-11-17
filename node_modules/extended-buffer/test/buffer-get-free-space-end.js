const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.getFreeSpaceEnd()', function () {
    it('Empty buffer', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        expect(buffer.getFreeSpaceEnd()).to.equal(5);
    });

    it('Write 1 byte to end', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt8(1);
        expect(buffer.getFreeSpaceEnd()).to.equal(4);
    });

    it('Write 5 bytes to end', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt8(1).writeUInt32BE(1);
        expect(buffer.getFreeSpaceEnd()).to.equal(0);
    });

    it('Write 1 byte to start', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt8(1, true);
        expect(buffer.getFreeSpaceEnd()).to.equal(5);
    });
});
