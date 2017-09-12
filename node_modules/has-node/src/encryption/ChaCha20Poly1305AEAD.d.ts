/// <reference types="node" />
export declare function decrypt(key: Buffer, nonceString: string, tag: Buffer, encryptedData: Buffer): Buffer | boolean;
export declare function encrypt(key: Buffer, nonceString: string, plainData: Buffer): Buffer;
export declare function expertDecrypt(key: Buffer, nonce: Buffer, tag: Buffer, data: Buffer, AAD: Buffer): Buffer | boolean;
export declare function expertEncrypt(key: Buffer, nonce: Buffer, plainData: Buffer, AAD: Buffer): Buffer;
