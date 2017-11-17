const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.nativeLength', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer;
        expect(buffer.nativeLength).to.equal(ExtendedBuffer.getMaxSize());
    });

    it('Test #2', function() {
        let buffer = new ExtendedBuffer({
            maxBufferLength: 1000
        });
        expect(buffer.nativeLength).to.equal(1000);
    });
});
