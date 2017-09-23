#include "poly.h"
#include "poly1305-donna.h"

using namespace node;
Nan::Persistent<v8::Function> Poly::constructor;

Poly::Poly() {};
Poly::~Poly() {};
void Poly::Init(v8::Local<v8::Object> exports) {
   Nan::HandleScope scope;

  // Prepare constructor template
  v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
  tpl->SetClassName(Nan::New("Poly").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  Nan::SetPrototypeMethod(tpl, "update", Update);
  Nan::SetPrototypeMethod(tpl, "finish", Finish);

  constructor.Reset(tpl->GetFunction());
  exports->Set(Nan::New("Poly").ToLocalChecked(), tpl->GetFunction());
}

void Poly::New(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  if (args.IsConstructCall()) {
    if (args.Length() !=  1||
        !Buffer::HasInstance(args[0])) {
      return Nan::ThrowError("invalid arguments");
    }
    unsigned char* key = reinterpret_cast<unsigned char*>(Buffer::Data(args[0]));
    size_t len = Buffer::Length(args[0]);
    if (len != 32) {
      return Nan::ThrowError("invalid key length");
    }
    poly1305_context ctx;
    poly1305_init(&ctx, key);
    Poly* obj = new Poly();
    obj->ctx_ = ctx;
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    const int argc = 1;
    v8::Local<v8::Value> argv[argc] = { args[0] };
    v8::Local<v8::Function> cons = Nan::New<v8::Function>(constructor);
    args.GetReturnValue().Set(Nan::NewInstance(cons, argc, argv).ToLocalChecked());
  }
}

void Poly::Update(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  Poly* obj = ObjectWrap::Unwrap<Poly>(args.Holder());
  if (args.Length() != 1 ||
        !Buffer::HasInstance(args[0]) ) {
      return Nan::ThrowError("must supply buffer");
    }
  unsigned char* input = reinterpret_cast<unsigned char*>(Buffer::Data(args[0]));
  size_t len = Buffer::Length(args[0]);
  poly1305_update(&obj->ctx_, input, len);
  args.GetReturnValue().Set(args.This());
}

void Poly::Finish(const Nan::FunctionCallbackInfo<v8::Value>& args) {
  Poly* obj = ObjectWrap::Unwrap<Poly>(args.Holder());
  unsigned char* mac = new unsigned char[16];
  poly1305_finish(&obj->ctx_, mac);
  v8::Local<v8::Value> res = Nan::NewBuffer(reinterpret_cast<char*>(mac), 16).ToLocalChecked();;
  args.GetReturnValue().Set(res);
}
