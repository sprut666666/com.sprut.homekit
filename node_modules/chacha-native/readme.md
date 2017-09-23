chacha native
===
[![Build Status](https://travis-ci.org/calvinmetcalf/chacha-native.svg)](https://travis-ci.org/calvinmetcalf/chacha-native)

Node bindings for Chacha20/poly1305, api is identical to [my pure JavaScript library](https://github.com/calvinmetcalf/chacha20poly1305), Chacha20 is based
on [this implementation](http://chacha20.insanecoding.org/) with Poly1305 based on [poly1305-donna](https://github.com/floodyberry/poly1305-donna) by way of [libressl](https://github.com/libressl-portable/openbsd/blob/6e5b37ae2618b181b18de9cb33262259e681fb85/src/lib/libssl/src/crypto/poly1305/poly1305.h). By default it implements the
[IETF](https://tools.ietf.org/html/draft-irtf-cfrg-chacha20-poly1305-10) version
of the chacha20 poly1305 aead, but the legacy method does the version compatibale with borringssl and others.

API
===

```js
var chacha = require('chacha-native');
```

# ChaCha20 Poly1305

```js
var cipher =  chacha.createCipher(key, nonce);
var decipher =  chacha.createDecipher(key, nonce);
```

Create a cipher object by passing it a 256 bit key and 96 bit nonce, API is
identical to crypto.createCipheriv()/createDecipheriv in node >= 11 with a gcm
mode, in other words, e.g.

```js
cipher.setAAD(nonencrypteddata);// must be called before data
var tag = cipher.getAuthTag();// must be called after finish or end

decipher.setAAD(nonencrypteddata);// must be called before data
decipher.setAuthTag(tag);// must be called before data
```

decipher with throw if you don't set a tag or the tag doesn't match. See the [node docs](https://github.com/joyent/node/blob/cfcb1de130867197cbc9c6012b7e84e08e53d032/doc/api/crypto.markdown#cryptocreatecipherivalgorithm-key-iv) for more info (the iv length for gcm is also 96 bit fyi).

# ChaCha20


```js
var cipher =  chacha.chacha(key, nonce);
```

The API is identical to a cipher/decipher object in node >= 10. Encryption and decryption are the same.

# Poly1305

```js
var hmac =  chacha.createHmac(key);
```

API is identical to an hmac in node, so it's a stream with update and digest methods.

# Legacy Aead

A variant version of the aead that is compatible with boringssl.

```js
var cipher =  new chacha.AeadLegacy(key, nonce);
var decipher =  new chacha.AeadLegacy(key, nonce, true);
```

The third parameter is whether it should decipher, otherwise identical to createCipher/createDecipher. Doesn't implement variable length tags.
