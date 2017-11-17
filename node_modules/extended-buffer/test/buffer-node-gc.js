const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.nodeGc()', function () {
    it('Run nodeGc', function() {
        let buffer = new ExtendedBuffer;
        expect(buffer.nodeGc()).to.equal(buffer);
    });
});
