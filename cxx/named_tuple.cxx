#include <type_traits>
#ifndef size_t
using size_t = unsigned long long;
#endif

template<typename T>
struct type_identity {
   using type = T;
};

template<typename ...>
struct pack{};

template<template <typename ...> typename, typename>
struct apply{};
template<
   template <typename ...> typename target,
   typename ...ts
>
struct apply<target, pack<ts...>>
{
   using type = target<ts...>;
};
template<template <typename ...> typename target, typename ...ts>
using apply_t = typename apply<target, ts...>::type;

template<typename ...>
struct head{};
template<typename val, typename ..._>
struct head<val, _...> {
   using type = val;
};
template<typename ...ts>
using head_t = typename head<ts...>::type;

template<typename...>
struct tail{};
template<typename _, typename ...vals>
struct tail<_, vals...>
{
   using type = pack<vals...>;
};
template<typename ...ts>
using tail_t = typename tail<ts...>::type;

template <typename>
struct last{};
template<typename ...all>
struct last<pack<all...>>
{
   using type = typename decltype((type_identity<all>{}, ...))::type;
};
template<typename ...ts>
using last_t = typename last<ts...>::type;

template<size_t>
struct tuple_resolver{};

template<typename ...>
struct tuple_0 {
   template<typename ...any>
   constexpr tuple_0(any ...) noexcept {};
};
template<>
struct tuple_resolver<0> {
   template<typename ...ts>
   using type = tuple_0<ts...>;
};

#define tuple_(prev, name, count) \
   template<typename ...ts> requires (sizeof...(ts) == count) \
   struct tuple_##count: apply_t<tuple_##prev, tail_t<ts...>> { \
      head_t<ts...> const name; \
      template<typename mine, typename ...rest> \
      constexpr tuple_##count<mine, rest...>(mine here, rest ...there) noexcept: \
         tuple_##prev<rest...>(there...), name{here} \
      {} \
   }; \
   template<> \
   struct tuple_resolver<count> { \
      template<typename ...ts> \
      using type = tuple_##count<ts...>; \
   }; \

tuple_(0, zero ,  1)
tuple_(1, one  ,  2)
tuple_(2, two  ,  3)
tuple_(3, three,  4)
tuple_(4, four ,  5)
tuple_(5, five ,  6)
tuple_(6, six  ,  7)
tuple_(7, seven,  8)
tuple_(8, eight,  9)
tuple_(9, nine , 10)

template<typename ...ts>
using tuple = typename tuple_resolver<sizeof...(ts)>::template type<ts...>;

/* EXAMPLE ********************************************************************/
#include <iostream>

tuple<float, char const *> divide(float a, float b) noexcept {
   if (b == 0) {
      return {0.f, "cannot divide by zero"};
   } else {
      return {(a / b), reinterpret_cast<char const *>(0)};
   }
}

int main() noexcept {
   float a, b;
   std::cin >> a >> b;
   auto res = divide(a, b);
   if (res.zero) {
      // error
      std::cout << res.zero << '\n';
   } else {
      std::cout << a << " divided by " << b << " is " << res.one << '\n';
   }
}
