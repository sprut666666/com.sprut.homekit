const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeString()', function () {
    it('Test #1', function() {
        let buffer = (new ExtendedBuffer).writeString('aaa').writeString('bbb');
        expect(buffer.toString()).to.equal('aaabbb');
    });

    it('Test #2', function() {
        let buffer = (new ExtendedBuffer).writeString('aaa').writeString('bbb', undefined, true);
        expect(buffer.toString()).to.equal('bbbaaa');
    });
});
