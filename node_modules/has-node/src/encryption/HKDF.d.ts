/// <reference types="node" />
export default function HKDF(input: Buffer, salt?: string, info?: string | Buffer, size?: number, hashFunction?: string): Buffer;
