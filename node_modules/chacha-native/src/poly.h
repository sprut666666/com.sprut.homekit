#ifndef POLY_H
#define POLY_H

#include <nan.h>
#include "poly1305-donna.h"

class Poly : public node::ObjectWrap {
 public:
  static void Init(v8::Handle<v8::Object> exports);

 private:
   Poly();
  ~Poly();

  static NAN_METHOD(New);
  static NAN_METHOD(Update);
  static NAN_METHOD(Finish);
  static Nan::Persistent<v8::Function> constructor;
  poly1305_context ctx_;
};

#endif
