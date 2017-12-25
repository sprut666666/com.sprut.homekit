/**
 * @file SRP implementation for HAP
 * @author MohammadHossein Abedinpour <abedinpourmh@gmail.com>
 * @licence Apache2
 */

import * as crypto from 'crypto';
const BigInteger = require('jsbn').BigInteger;

type BigInt = any;

export default class SRP {
    /**
     * @property SRP Username (I)
     * @private
     * @readonly
     */
    private readonly username: Buffer = Buffer.from('Pair-Setup');

    /**
     * @property SRP Length
     * @private
     * @readonly
     */
    private readonly length: number = 3072;

    /**
     * @property SRP Password (p)
     * @public
     * @requires
     */
    public password: Buffer;

    /**
     * @property SRP Server Salt (s)
     * @public
     */
    public salt: Buffer;

    /**
     * @property ID of the TCP socket which is related to this SRP
     * @public
     */
    public socketID: number;

    /**
     * @property SRP Verifier (v)
     * @private
     */
    private verifier: Buffer;

    /**
     * @property SRP A Public (A)
     * @private
     */
    private APublic: Buffer;

    /**
     * @property SRP B Public (B)
     * @private
     */
    private BPublic: Buffer;

    /**
     * @property SRP B Private (b)
     * @private
     */
    private BPrivate: BigInt;

    /**
     * @property SRP Generator (g)
     * @private
     * @readonly
     */
    private readonly generator: BigInt = new BigInteger('05');

    /**
     * @property SRP Hash Function
     * @private
     * @readonly
     */
    private readonly hashFunction: string = 'sha512';

    /**
     * @property SRP Modules (N)
     * @private
     * @readonly
     */
    private readonly modules: BigInt = new BigInteger('FFFFFFFF FFFFFFFF C90FDAA2 2168C234 C4C6628B 80DC1CD1 29024E08 8A67CC74 020BBEA6 3B139B22 514A0879 8E3404DD EF9519B3 CD3A431B 302B0A6D F25F1437 4FE1356D 6D51C245 E485B576 625E7EC6 F44C42E9 A637ED6B 0BFF5CB6 F406B7ED EE386BFB 5A899FA5 AE9F2411 7C4B1FE6 49286651 ECE45B3D C2007CB8 A163BF05 98DA4836 1C55D39A 69163FA8 FD24CF5F 83655D23 DCA3AD96 1C62F356 208552BB 9ED52907 7096966D 670C354E 4ABC9804 F1746C08 CA18217C 32905E46 2E36CE3B E39E772C 180E8603 9B2783A2 EC07A28F B5C55DF0 6F4C52C9 DE2BCBF6 95581718 3995497C EA956AE5 15D22618 98FA0510 15728E5A 8AAAC42D AD33170D 04507A33 A85521AB DF1CBA64 ECFB8504 58DBEF0A 8AEA7157 5D060C7D B3970F85 A6E1E4C7 ABF5AE8C DB0933D7 1E8C94E0 4A25619D CEE3D226 1AD2EE6B F12FFA06 D98A0864 D8760273 3EC86A64 521F2B18 177B200C BBE11757 7A615D6C 770988C0 BAD946E2 08E24FA0 74E5AB31 43DB5BFC E0FD108E 4B82D120 A93AD2CA FFFFFFFF FFFFFFFF'.split(/ /).join(''), 16);

    /**
     * @property SRP Random Scrambling Parameter (u)
     * @private
     */
    private randomScrambling: BigInt;

    /**
     * @property SRP Premaster Secret (S)
     * @private
     */
    private premasterSecret: Buffer;

    /**
     * @property SRP Session Key (K)
     * @private
     */
    private sessionKey: Buffer;

    /**
     * @property SRP M1 Proof
     * @private
     */
    private M1Proof: Buffer;

    /**
     * @property SRP M2 Proof
     * @private
     */
    private M2Proof: Buffer;

    constructor(password: string) {
        if (password)
            this.password = Buffer.from(password);
        else
            throw new Error('Invalid Password');

        // Create SRP Salt (s)
        this.salt = crypto.randomBytes(16);

        this.createVerifier();

        this.createB();
    }


    /**
     * @method Creates SRP B public (B) and B private (b)
     */
    private createB() {
        this.BPrivate = this.buffer2BigInt(crypto.randomBytes(32));

        const BPublic = this.createK().multiply(this.buffer2BigInt(this.verifier)).add(this.generator.modPow(this.BPrivate, this.modules)).mod(this.modules);
        this.BPublic = this.bigInt2Buffer(BPublic);
    }

    /**
     * @method Creates SRP-6 multiplier (k)
     * @returns {BigInt}
     */
    private createK(): BigInt {
        return this.buffer2BigInt(crypto.createHash(this.hashFunction).update(this.fixLength(this.modules)).update(this.fixLength(this.generator)).digest());
    }

    /**
     * @method Creates the intermediate hash
     * @returns
     */
    public createXHash(): any {
        const identityHash = crypto.createHash(this.hashFunction).update(this.username).update(Buffer.from(':')).update(this.password).digest();
        const saltHash = crypto.createHash(this.hashFunction).update(this.salt).update(identityHash).digest();
        return this.buffer2BigInt(saltHash);
    }

    /**
     * @method Creates SRP verifier (v)
     */
    private createVerifier() {
        this.verifier = this.bigInt2Buffer(this.generator.modPow(this.createXHash(), this.modules));
    }

    /**
     * @method Returns SRP B public (B)
     */
    public getPublicKey(): Buffer {
        return this.BPublic;
    }

    /**
     * @method Sets public key of client (A)
     */
    public setClientPublicKey(buffer: Buffer) {
        this.APublic = buffer;

        this.createRandomScrambling();

        this.createPremasterSecret();

        this.createSessionKey();

        this.createM1Proof();
    }

    /**
     * @method Creates SRP random scrambling parameter (u)
     */
    private createRandomScrambling() {
        this.randomScrambling = this.buffer2BigInt(crypto.createHash(this.hashFunction).update(this.fixLength(this.APublic)).update(this.fixLength(this.BPublic)).digest());
    }

    /**
     * @method Creates SRP premaster secret (S)
     */
    private createPremasterSecret() {
        this.premasterSecret = this.bigInt2Buffer(this.buffer2BigInt(this.APublic).multiply(this.buffer2BigInt(this.verifier).modPow(this.randomScrambling, this.modules)).modPow(this.BPrivate, this.modules).mod(this.modules));
    }

    /**
     * @method Creates SRP session key (K)
     */
    private createSessionKey() {
        this.sessionKey = crypto.createHash(this.hashFunction).update(this.premasterSecret).digest();
    }

    /**
     * @method Returns SRP session key (K)
     */
    public getSessionKey(): Buffer {
        return this.sessionKey;
    }

    /**
     * @method Creates SRP M1 proof
     */
    private createM1Proof() {
        const headerHash = crypto.createHash(this.hashFunction).update(this.bigInt2Buffer(this.modules)).digest(),
            headerHelperHash = crypto.createHash(this.hashFunction).update(this.bigInt2Buffer(this.generator)).digest();
        for (let index = 0; index < headerHash.length; index++)
            headerHash[index] ^= headerHelperHash[index];

        this.M1Proof = crypto.createHash(this.hashFunction).update(headerHash).update(crypto.createHash(this.hashFunction).update(this.username).digest()).update(this.salt).update(this.APublic).update(this.BPublic).update(this.sessionKey).digest();
    }

    /**
     * @method Checks client proof
     * @param clientProof
     * @returns boolean
     */
    public checkClientProof(clientProof: Buffer): boolean {
        return clientProof.toString('hex') === this.M1Proof.toString('hex');
    }

    /**
     * @method Creates SRP M2 proof
     * @returns Buffer
     */
    public getM2Proof(): Buffer {
        this.M2Proof = crypto.createHash(this.hashFunction).update(this.APublic).update(this.M1Proof).update(this.sessionKey).digest();
        return this.M2Proof;
    }

    /**
     * @method Converts buffer to BigInt object
     * @param buffer
     */
    private buffer2BigInt(buffer: Buffer): BigInt {
        return new BigInteger(buffer.toString('hex'), 16);
    }

    /**
     * @method Converts BigInt to buffer
     * @param buffer
     */
    private bigInt2Buffer(bigInt: BigInt): Buffer {
        let hex = bigInt.toString(16);
        if (hex.length % 2 === 1)
            hex = '0' + hex;
        return Buffer.from(hex, 'hex');
    }

    /**
     * @method Fixes length of a buffer
     * @param input
     * @param length
     * @returns {Buffer}
     */
    private fixLength(input: Buffer | BigInt): Buffer {
        if (!Buffer.isBuffer(input))
            input = this.bigInt2Buffer(input);

        const length = this.length / 8;
        const padding = length - input.length;
        const result = Buffer.alloc(length);
        result.fill(0, 0, padding);
        input.copy(result, padding);
        return result;
    }
}
