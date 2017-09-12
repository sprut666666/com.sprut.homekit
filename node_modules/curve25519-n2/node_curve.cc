#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <string.h>
#include <stdlib.h>
#ifdef _WIN32
  #include <io.h>
#else
  #include <unistd.h>
#endif
#include "curve25519-donna.c"

#include <nan.h>

using namespace std;
using namespace node;
using namespace v8;

static NAN_METHOD(DoCurve);
extern "C" void init (Handle<Object>);

static NAN_METHOD(DoCurve) {
  Nan::HandleScope scope;
  const char *usage = "usage: curve(a, b, c)";
  if (info.Length() != 3) {
    return Nan::ThrowSyntaxError(usage);
  }
  unsigned char* arg0 = (unsigned char*) Buffer::Data(info[0]->ToObject());
  unsigned char* arg1 = (unsigned char*) Buffer::Data(info[1]->ToObject());
  unsigned char* arg2 = (unsigned char*) Buffer::Data(info[2]->ToObject());
  curve25519_donna(arg0, arg1, arg2);
}

extern "C" void init (Handle<Object> target) {
  Nan::HandleScope scope;
  Nan::SetMethod(target, "curve", DoCurve);
}


NODE_MODULE(curve, init)
