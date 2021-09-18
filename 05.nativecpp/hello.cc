#include <napi.h>

int fib(int x) {
  if (x == 0) return 0;

  if (x == 1) return 1;

  return fib(x - 1) + fib(x - 2);
}

Napi::Value Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  double arg0 = info[0].As<Napi::Number>().Int32Value();

  return Napi::Number::New(env, fib(arg0));
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"),
              Napi::Function::New(env, Method));
  return exports;
}

NODE_API_MODULE(hello, Init)
