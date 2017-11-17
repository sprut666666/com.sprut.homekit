const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.getPointer()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer;
        buffer.pointer = 123;
        expect(buffer.getPointer()).to.equal(123);
    });
});
