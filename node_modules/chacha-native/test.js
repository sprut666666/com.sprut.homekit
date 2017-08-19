'use strict';
var lib = require('./lib');
var jslib = require('chacha');
var Chacha = lib.chacha20;
var Chachajs = jslib.chacha20;
var Poly = lib.createHmac;
var Polyjs = jslib.createHmac;
var test = require('tape');
var crypto = require('crypto');
var AEAD = lib.aead;
var AEADjs = jslib.aead;
var Legacy = lib.aeadLegacy;
var Legacyjs = jslib.aeadLegacy;
var i = 0;
function testIt(t) {
  t.plan(2);
  var key = crypto.randomBytes(32);
  var iv = crypto.randomBytes(12);
  var c = new Chacha(key, iv);
  var c2 = new Chacha(key, iv);
  var js = new Chachajs(key, iv);
  var data = crypto.randomBytes(1000);
  var js4 = js.update(data).toString('hex');
  t.equals(c.update(data).toString('hex'), js4);
  t.equals(c2.update(data).toString('hex'), js4);
}
function testItNoBody(t) {
  t.plan(2);
  var key = crypto.randomBytes(32);
  var iv = crypto.randomBytes(8);
  var c = new Legacy(key, iv);
  c.final();
  var c2 = new AEAD(key, Buffer.concat([new Buffer([0,0,0,0]), iv]));
  c2.final();
  var js = new Legacyjs(key, iv);
  js.final();
  var tc1 = c.getAuthTag();
  var tc2 = c2.getAuthTag();
  var tj = js.getAuthTag();
  t.equals(tc1.toString('hex'), tj.toString('hex'));
  t.equals(tc2.toString('hex'), tj.toString('hex'));
}
function testPoly(t) {
  t.plan(1);
  var key = crypto.randomBytes(32);
  var c = new Poly(key);
  var js = new Polyjs(key);
  var data = crypto.randomBytes(1000);
  var jsOut = js.update(data).digest().toString('hex');
  var cOut = c.update(data).digest().toString('hex');
  t.equals(cOut, jsOut);
}
function testBadPassword (AEAD) {
  return function(t) {
    t.plan(2);
    var key = crypto.randomBytes(32);
    var key2 = new Buffer(32);
    key.copy(key2);
    if (key2[0]) {
      key2[0] = 0;
    } else {
      key2[0] = 1;
    }
    var iv = crypto.randomBytes(12);
    var data = crypto.randomBytes(60);
    var enc = new AEAD(key, iv);
    var encrypted = enc.update(data);
    enc.final();
    var authTag = enc.getAuthTag();
    var correctPassword =  new AEAD(key, iv, true);
    var badPassword = new AEAD(key2, iv, true);
    correctPassword.setAuthTag(authTag);
    badPassword.setAuthTag(authTag);
    var decryptedCorrect = correctPassword.update(encrypted);
    var decryptedinCorrect = badPassword.update(encrypted);
    t.doesNotThrow(correctPassword.final.bind(correctPassword), 'correctPassword');
    t.throws(badPassword.final.bind(badPassword), 'badPassword');
  }
}
function testAEAD (AEAD, AEADjs, ivlen) {
  return function(t) {
    t.plan(10);
    var key = crypto.randomBytes(32);
    var iv = crypto.randomBytes(ivlen);
    var c = new AEAD(key, iv);
    var js = new AEADjs(key, iv);
    var data = crypto.randomBytes(1000);
    var aad = crypto.randomBytes(16);
    c.setAAD(aad);
    js.setAAD(aad);

    var cOut = c.update(data);
    var jsOut = js.update(data);
    var iv2 = iv;
    if (ivlen < 12) {
      iv2 = Buffer.concat([new Buffer([0,0,0,0]), iv]);
    }
    var c3 = new Chacha(key, iv2);
    var js3 = new Chachajs(key, iv2);
    var zeros = new Buffer(64);
    zeros.fill(0);
    c3.update(zeros);
    js3.update(zeros);
    var cOut3 = c3.update(data).toString('hex');
    var jsOut3 = js3.update(data).toString('hex');
    t.equals(cOut.toString('hex'), cOut3, 'cipher texts match1');
    t.equals(jsOut.toString('hex'), jsOut3, 'cipher texts match2');
    c.final();
    js.final();
    var ctag = c.getAuthTag();
    var jstag = js.getAuthTag();
    t.equals(ctag.toString('hex'), jstag.toString('hex'), 'tags match');
    var c2 = new AEAD(key, iv, true);
    var js2 = new AEADjs(key, iv, true);
    c2.setAAD(aad);
    js2.setAAD(aad);
    c2.setAuthTag(jstag);
    js2.setAuthTag(ctag);
    var c2js = js2.update(cOut).toString('hex');
    var js2c = c2.update(jsOut).toString('hex');
    t.equals(c2js, js2c, 'both directions match');
    t.equals(data.toString('hex'), c2js, 'c2js matches');
    t.equals(data.toString('hex'), js2c, 'js2c matches');
    t.doesNotThrow(c2.final.bind(c2), 'c2');
    t.doesNotThrow(js2.final.bind(js2), 'js2');
    t.throws(c2.final.bind(c2), 'c2');
    t.throws(js2.final.bind(js2), 'js2');
  }
}
while (i++ < 50) {
  test('cipher round ' + i, testIt);
  test('poly round ' + i, testPoly);
  test('aead round ' + i, testAEAD (AEAD, AEADjs, 12));
  test('legacy round ' + i, testAEAD (Legacy, Legacyjs, 8));
}
test('bad password', testBadPassword(AEAD));
test('bad password js', testBadPassword(AEADjs));
test('no body', testItNoBody);
