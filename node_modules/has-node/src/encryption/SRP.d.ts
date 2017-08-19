/// <reference types="node" />
export default class SRP {
    private readonly username;
    private readonly length;
    password: Buffer;
    salt: Buffer;
    socketID: number;
    private verifier;
    private APublic;
    private BPublic;
    private BPrivate;
    private readonly generator;
    private readonly hashFunction;
    private readonly modules;
    private randomScrambling;
    private premasterSecret;
    private sessionKey;
    private M1Proof;
    private M2Proof;
    constructor(password: string);
    private createB();
    private createK();
    createXHash(): any;
    private createVerifier();
    getPublicKey(): Buffer;
    setClientPublicKey(buffer: Buffer): void;
    private createRandomScrambling();
    private createPremasterSecret();
    private createSessionKey();
    getSessionKey(): Buffer;
    private createM1Proof();
    checkClientProof(clientProof: Buffer): boolean;
    getM2Proof(): Buffer;
    private buffer2BigInt(buffer);
    private bigInt2Buffer(bigInt);
    private fixLength(input);
}
