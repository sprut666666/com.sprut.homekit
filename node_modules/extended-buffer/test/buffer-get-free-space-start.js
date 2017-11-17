const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.getFreeSpaceStart()', function () {
    it('Empty buffer', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        expect(buffer.getFreeSpaceStart()).to.equal(5);
    });

    it('Write 1 byte to start', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt8(1, true);
        expect(buffer.getFreeSpaceStart()).to.equal(4);
    });

    it('Write 5 bytes to start', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt8(1, true).writeUInt32BE(1, true);
        expect(buffer.getFreeSpaceStart()).to.equal(0);
    });

    it('Write 1 byte to end', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.writeUInt8(1);
        expect(buffer.getFreeSpaceStart()).to.equal(5);
    });
});
