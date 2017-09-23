#include <string.h>
#include "aead.h"

using namespace node;
Nan::Persistent<v8::Function> AEAD::constructor;

AEAD::AEAD() {};
AEAD::~AEAD() {};
void AEAD::Init(v8::Local<v8::Object> exports) {
  Nan::HandleScope scope;

  // Prepare constructor template
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("AEAD").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(5);

  // Prototype
  Nan::SetPrototypeMethod(tpl, "update", Update);
  Nan::SetPrototypeMethod(tpl, "setAAD", UpdateAad);
  Nan::SetPrototypeMethod(tpl, "finish", Finish);

  constructor.Reset(tpl->GetFunction());
  exports->Set(Nan::New("AEAD").ToLocalChecked(), tpl->GetFunction());
}

void AEAD::New(const Nan::FunctionCallbackInfo<v8::Value>& args) {

  if (args.IsConstructCall()) {
    if (args.Length() < 3 ||
        !Buffer::HasInstance(args[0]) ||
        !Buffer::HasInstance(args[1])) {
      return Nan::ThrowError("must supply key and iv");
    }
    unsigned char* key = reinterpret_cast<unsigned char*>(Buffer::Data(args[0]));
    unsigned char* iv = reinterpret_cast<unsigned char*>(Buffer::Data(args[1]));
    bool decrypt = args[2]->IsUndefined() ? false : args[2]->BooleanValue();
    size_t len = Buffer::Length(args[0]);
    size_t ivlen = Buffer::Length(args[1]);
    if (len != 32) {
      return Nan::ThrowError("invalid key length");
    }
    if (ivlen != 12) {
      return Nan::ThrowError("invalid nonce length");
    }
    chacha20_ctx ctx;
    chacha20_setup(&ctx, key, len, iv);
    unsigned long long clen = 0;
    unsigned long long alen = 0;
    AEAD* obj = new AEAD();
    obj->ctx_ = ctx;
    obj->decrypt_ = decrypt;
    obj->clen_ = clen;
    obj->alen_ = alen;
    poly1305_context poly;

    unsigned char* polykey = new unsigned char[64];
    memset(polykey, 0, 64);
    chacha20_encrypt(&obj->ctx_, polykey, polykey, 64);
    obj->poly_ = poly;
    poly1305_init(&obj->poly_, polykey);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    const int argc = 3;
    v8::Local<v8::Value> argv[argc] = { args[0], args[1], args[2]};
    v8::Local<v8::Function> cons = Nan::New<v8::Function>(constructor);
    args.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}
void AEAD::UpdateAad(const Nan::FunctionCallbackInfo<v8::Value>& args) {

  AEAD* obj = ObjectWrap::Unwrap<AEAD>(args.Holder());
  if (args.Length() != 1 ||
        !Buffer::HasInstance(args[0]) ) {
      return Nan::ThrowError("must supply buffer");
    }
    unsigned long long clen = obj->clen_;
    unsigned long long alen = obj->alen_;
    if (clen != 0 || alen != 0) {
      return Nan::ThrowError("invalid state");
    }
    unsigned char* aad = reinterpret_cast<unsigned char*>(Buffer::Data(args[0]));
    size_t aadlen = Buffer::Length(args[0]);
    poly1305_update(&obj->poly_, aad, aadlen);
    unsigned long long longaadlen = (unsigned long long) aadlen;
    obj->alen_ += longaadlen;
    if (aadlen % 16) {
      size_t padding_len = 16 - (aadlen % 16);
      unsigned char* padding = new unsigned char[15];
      memset(padding, 0, 15);
      poly1305_update(&obj->poly_, padding, padding_len);
    }
    args.GetReturnValue().Set(args.This());
}

void AEAD::Update(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  AEAD* obj = ObjectWrap::Unwrap<AEAD>(args.Holder());
  if (args.Length() != 1 ||
        !Buffer::HasInstance(args[0]) ) {
      return Nan::ThrowError("must supply buffer");
    }
  unsigned char* input = reinterpret_cast<unsigned char*>(Buffer::Data(args[0]));
  size_t len = Buffer::Length(args[0]);

  unsigned char* out = new unsigned char[len];
  if (!chacha20_encrypt(&obj->ctx_, input, out, len)) {
    return Nan::ThrowError("counter exausted");
  };

  if (obj->decrypt_) {
    poly1305_update(&obj->poly_, input, len);
  } else {
    poly1305_update(&obj->poly_, out, len);
  }
  unsigned long long longlen = (unsigned long long) len;
  obj->clen_ += longlen;
  v8::Local<v8::Value> res = Nan::NewBuffer(reinterpret_cast<char*>(out), len).ToLocalChecked();
  args.GetReturnValue().Set(res);
}

void AEAD::Finish(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  AEAD* obj = ObjectWrap::Unwrap<AEAD>(args.Holder());
  unsigned long long clen = obj->clen_;
  unsigned long long alen = obj->alen_;
  if (clen % 16) {
    size_t padding_len = 16 - (clen % 16);
    unsigned char* padding = new unsigned char[15];
    memset(padding, 0, 15);
    poly1305_update(&obj->poly_, padding, padding_len);
  }
  unsigned char length_bytes[16];
	unsigned i;
  for (i = 0; i < 8; i++) {
		length_bytes[i] = alen;
    alen >>= 8;
    length_bytes[i + 8] = clen;
    clen >>= 8;
	}
  poly1305_update(&obj->poly_, length_bytes, 16);
  unsigned char* mac = new unsigned char[16];
  poly1305_finish(&obj->poly_, mac);
  bool decrypt = obj -> decrypt_;
  if (decrypt) {
    if (args.Length() != 1 ||
        !Buffer::HasInstance(args[0])) {
          return Nan::ThrowError("must supply tag");
        }
    unsigned char* tag = reinterpret_cast<unsigned char*>(Buffer::Data(args[0]));
    if (poly1305_verify(tag, mac) == 1) {
      args.GetReturnValue().Set(Nan::Undefined());
    } else {
      return Nan::ThrowError("unable to authenticate");
    }
  } else {
    v8::Local<v8::Value> res = Nan::NewBuffer(reinterpret_cast<char*>(mac), 16).ToLocalChecked();
    args.GetReturnValue().Set(res);
  }
}
