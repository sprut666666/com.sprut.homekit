#ifndef Legacy_H
#define Legacy_H

#include <nan.h>
#include "chacha20_simple.h"
#include "poly1305-donna.h"

class Legacy : public node::ObjectWrap {
 public:
  static void Init(v8::Handle<v8::Object> exports);

 private:
   Legacy();
  ~Legacy();

  static NAN_METHOD(New);
  static NAN_METHOD(UpdateAad);
  static NAN_METHOD(Update);
  static NAN_METHOD(Finish);
  static Nan::Persistent<v8::Function> constructor;
  chacha20_ctx ctx_;
  poly1305_context poly_;
  bool decrypt_;
  unsigned long long clen_;
};

#endif
