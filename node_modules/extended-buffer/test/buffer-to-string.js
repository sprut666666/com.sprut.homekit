const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.toString()', function () {
    it('Test #1', function() {
        let buffer = new ExtendedBuffer;
        expect(buffer.toString()).to.equal('');
    });

    it('Test #2', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from('Hello'));
        expect(buffer.toString()).to.equal('Hello');
    });

    it('Test #3', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from('Hello'));
        buffer.offset(1);
        expect(buffer.toString()).to.equal('Hello');
    });

    it('Test #4', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from('Hello'));
        buffer.offset(1).gc();
        expect(buffer.toString()).to.equal('ello');
    });

    it('Test #5', function() {
        let buffer = (new ExtendedBuffer).writeBuffer(Buffer.from('Hello'));
        expect(buffer.toString('base64')).to.equal('SGVsbG8=');
    });
});
