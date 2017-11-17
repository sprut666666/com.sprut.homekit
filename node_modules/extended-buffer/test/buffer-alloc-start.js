const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.allocStart()', function () {
    it('Not enough free space', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        expect(function () {
            buffer.allocStart(11);
        }).to.throw('Not enough free space');
    });

    it('Alloc -1 byte', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.allocStart(-1);
        expect(buffer.getFreeSpaceStart()).to.equal(5);
    });

    it('Alloc 1 byte', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.allocStart(1);
        expect(buffer.getFreeSpaceStart()).to.equal(5);
    });

    it('Alloc 5 bytes', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.allocStart(5);
        expect(buffer.getFreeSpaceStart()).to.equal(5);
    });

    it('Alloc 10 bytes', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 10
        });
        buffer.allocStart(10);
        expect(buffer.getFreeSpaceStart()).to.equal(10);
    });
});
