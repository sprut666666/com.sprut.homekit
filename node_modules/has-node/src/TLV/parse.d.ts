/// <reference types="node" />
export default function parseTLV(buffer: Buffer): {
    [index: number]: Buffer;
};
