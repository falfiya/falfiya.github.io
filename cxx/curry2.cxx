#include <tuple>
using namespace std;

template <class Return, class ...Args>
using fn = Return (*)(Args...);

template <class Return, class ...Args>
struct curried {
   fn<Return, Args...> fn;
   tuple<Args...> args;

   Return operator()() {
      return fn();
   }
}



template <class R, class A, class B>
auto curry2(fn<R, A, B> fn) {
   return [fn](A a){
      
   };
}
