#include "chacha.h"

using namespace node;
Nan::Persistent<v8::Function> Chacha::constructor;

Chacha::Chacha() {};
Chacha::~Chacha() {};
void Chacha::Init(v8::Local<v8::Object> exports) {
  Nan::HandleScope scope;

  // Prepare constructor template
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Chacha").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  Nan::SetPrototypeMethod(tpl, "update", Update);

  constructor.Reset(tpl->GetFunction());
  exports->Set(Nan::New("Chacha").ToLocalChecked(), tpl->GetFunction());
}

void Chacha::New(const Nan::FunctionCallbackInfo<v8::Value>& info) {

  if (info.IsConstructCall()) {
    if (info.Length() != 2 ||
        !Buffer::HasInstance(info[0]) ||
        !Buffer::HasInstance(info[1])) {
      return Nan::ThrowError("must supply 2 buffers");
    }
    unsigned char* key = reinterpret_cast<unsigned char*>(Buffer::Data(info[0]));
    unsigned char* iv = reinterpret_cast<unsigned char*>(Buffer::Data(info[1]));
    size_t len = Buffer::Length(info[0]);
    size_t ivlen = Buffer::Length(info[1]);
    if (len != 32) {
      return Nan::ThrowError("invalid key length");
    }
    if (ivlen != 12) {
      return Nan::ThrowError("invalid nonce length");
    }
    chacha20_ctx ctx;
    chacha20_setup(&ctx, key, len, iv);
    Chacha* obj = new Chacha();
    obj->ctx_ = ctx;
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
  } else {
    const int argc = 2;
    v8::Local<v8::Value> argv[argc] = { info[0], info[1] };
    v8::Local<v8::Function> cons = Nan::New<v8::Function>(constructor);
    info.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}
void Chacha::Update(const Nan::FunctionCallbackInfo<v8::Value>& info) {

  Chacha* obj = ObjectWrap::Unwrap<Chacha>(info.Holder());
  if (info.Length() != 1 ||
        !Buffer::HasInstance(info[0]) ) {
      return Nan::ThrowError("must supply buffer");
    }
  unsigned char* input = reinterpret_cast<unsigned char*>(Buffer::Data(info[0]));
  size_t len = Buffer::Length(info[0]);
  unsigned char* out = new unsigned char[len];
  if (!chacha20_encrypt(&obj->ctx_, input, out, len)) {
    return Nan::ThrowError("counter exausted");
  };
  v8::Local<v8::Value> res = Nan::NewBuffer(reinterpret_cast<char*>(out), len).ToLocalChecked();
  info.GetReturnValue().Set(res);
}
