const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.clean()', function () {
    it('Test #1', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3])).clean();
        expect(buffer.length).to.equal(0);
    });

    it('Test #2', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from([1, 2, 3])).clean();
        expect(buffer.pointer).to.equal(0);
    });
});
