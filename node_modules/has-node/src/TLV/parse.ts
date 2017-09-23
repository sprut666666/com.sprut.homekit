/**
 * @file Parse TLV
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

export default function parseTLV(buffer: Buffer): { [index: number]: Buffer } {
    let TLV: { [index: number]: Buffer } = {},
        currentIndex = 0;
    while (currentIndex < buffer.length) {
        let iBuffer = buffer.slice(currentIndex + 2, currentIndex + 2 + buffer[currentIndex + 1]);
        if (TLV[buffer[currentIndex]])
            TLV[buffer[currentIndex]] = Buffer.concat([TLV[buffer[currentIndex]], iBuffer]);
        else
            TLV[buffer[currentIndex]] = iBuffer;
        currentIndex += 2 + buffer[currentIndex + 1];
    }
    return TLV;
}