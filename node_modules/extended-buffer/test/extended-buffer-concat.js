const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('ExtendedBuffer.concat()', function () {
    it('Empty list', function() {
        let buf1 = ExtendedBuffer.concat([]);
        let buf2 = Buffer.from([]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
    
    it('Native buffers list', function () {
        let buf1 = ExtendedBuffer.concat([
            Buffer.from('abc'),
            Buffer.from('dfg'),
            Buffer.from('xyz')
        ]);
        let buf2 = Buffer.from('abcdfgxyz');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Native buffers list with totalLength #1', function () {
        let buf1 = ExtendedBuffer.concat([
            Buffer.from('abc'),
            Buffer.from('dfg'),
            Buffer.from('xyz')
        ], 5);
        let buf2 = Buffer.from('abcdf');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Native buffers list with totalLength #2', function () {
        let buf1 = ExtendedBuffer.concat([
            Buffer.from('abc'),
            Buffer.from('dfg'),
            Buffer.from('xyz')
        ], 100);
        let buf2 = Buffer.from('abcdfgxyz');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });



    it('ExtendedBuffer buffers list', function () {
        let buf1 = ExtendedBuffer.concat([
            (new ExtendedBuffer).writeString('abc'),
            (new ExtendedBuffer).writeString('dfg'),
            (new ExtendedBuffer).writeString('xyz')
        ]);
        let buf2 = Buffer.from('abcdfgxyz');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('ExtendedBuffer buffers list with totalLength #1', function () {
        let buf1 = ExtendedBuffer.concat([
            (new ExtendedBuffer).writeString('abc'),
            (new ExtendedBuffer).writeString('dfg'),
            (new ExtendedBuffer).writeString('xyz')
        ], 5);
        let buf2 = Buffer.from('abcdf');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('ExtendedBuffer buffers list with totalLength #2', function () {
        let buf1 = ExtendedBuffer.concat([
            (new ExtendedBuffer).writeString('abc'),
            (new ExtendedBuffer).writeString('dfg'),
            (new ExtendedBuffer).writeString('xyz')
        ], 100);
        let buf2 = Buffer.from('abcdfgxyz');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Both buffers list', function () {
        let buf1 = ExtendedBuffer.concat([
            (new ExtendedBuffer).writeString('abc'),
            Buffer.from('dfg'),
            (new ExtendedBuffer).writeString('xyz')
        ]);
        let buf2 = Buffer.from('abcdfgxyz');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Both buffers list with totalLength #1', function () {
        let buf1 = ExtendedBuffer.concat([
            (new ExtendedBuffer).writeString('abc'),
            Buffer.from('dfg'),
            (new ExtendedBuffer).writeString('xyz')
        ], 5);
        let buf2 = Buffer.from('abcdf');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Both buffers list with totalLength #2', function () {
        let buf1 = ExtendedBuffer.concat([
            (new ExtendedBuffer).writeString('abc'),
            Buffer.from('dfg'),
            (new ExtendedBuffer).writeString('xyz')
        ], 100);
        let buf2 = Buffer.from('abcdfgxyz');
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
