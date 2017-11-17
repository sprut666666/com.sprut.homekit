const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.isWritable()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 3
        });
        expect(buffer.isWritable(0)).to.equal(true);
    });

    it('Test #2', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 3
        });
        expect(buffer.isWritable(1)).to.equal(true);
    });

    it('Test #3', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 3
        });
        expect(buffer.isWritable(1)).to.equal(true);
    });

    it('Test #4', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 3
        });
        expect(buffer.isWritable(5)).to.equal(false);
    });
});
