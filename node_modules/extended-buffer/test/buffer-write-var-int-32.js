const expect  = require('chai').expect;
const ExtendedBuffer = require('../src/extended-buffer');

describe('buffer.writeVarInt32()', function () {
    it('Test #1', function() {
        let buf1 = (new ExtendedBuffer).writeVarInt32(1000).writeVarInt32(2000);
        let buf2 = Buffer.from([0xe8, 0x07, 0xd0, 0x0f]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });

    it('Test #2', function() {
        let buf1 = (new ExtendedBuffer).writeVarInt32(1000).writeVarInt32(2000, true);
        let buf2 = Buffer.from([0xd0, 0x0f, 0xe8, 0x07]);
        expect(Buffer.compare(buf1.buffer, buf2)).to.equal(0);
    });
});
