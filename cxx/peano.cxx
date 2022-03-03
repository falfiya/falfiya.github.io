struct Z{};
/// successor
template<typename n>
struct S{};
/// predecessor
template<typename n>
struct P{};

template<typename n>
struct Succ_{ using type = S<n>; };
template<typename n>
struct Succ_<P<n>>{ using type = n; };
template<typename n>
using Succ = typename Succ_<n>::type;

template<typename n>
struct Pred_{ using type = P<n>; };
template<typename n>
struct Pred_<S<n>>{ using type = n; };
template<typename n>
using Pred = typename Pred_<n>::type;

using N0 = Z;
using N1 = Succ<N0>;
using N2 = Succ<N1>;
using N3 = Succ<N2>;
using N4 = Succ<N3>;
using N5 = Succ<N4>;
using N6 = Succ<N5>;
using N7 = Succ<N6>;
using N8 = Succ<N7>;
using N9 = Succ<N8>;
// minus
using M1 = Pred<Z>;
using M2 = Pred<M1>;
using M3 = Pred<M2>;
using M4 = Pred<M3>;
using M5 = Pred<M4>;
using M6 = Pred<M5>;
using M7 = Pred<M6>;
using M8 = Pred<M7>;
using M9 = Pred<M8>;

template<typename a, typename b>
struct Add_{};
template<typename acc>
struct Add_<acc, N0>{ using type = acc; };
template<typename acc, typename pred_b>
struct Add_<acc, S<pred_b>>{
   using type = typename Add_<Succ<acc>, pred_b>::type;
};
template<typename acc, typename succ_b>
struct Add_<acc, P<succ_b>>{
   using type = typename Add_<Pred<acc>, succ_b>::type;
};
template<typename a, typename b>
using Add = typename Add_<a, b>::type;

template<typename n, typename acc>
struct Negate_{};
template<typename acc>
struct Negate_<N0, acc>{ using type = acc; };
template<typename n, typename acc>
struct Negate_<S<n>, acc>{
   using type = typename Negate_<n, Pred<acc>>::type;
};
template<typename n, typename acc>
struct Negate_<P<n>, acc>{
   using type = typename Negate_<n, Succ<acc>>::type;
};
template<typename n>
using Negate = typename Negate_<n, N0>::type;

template<typename a, typename b>
using Sub = Add<a, Negate<b>>;

template<typename a, typename pos_b, typename neg_b, typename acc>
struct Mul_{};
template<typename pos_b, typename neg_b, typename acc>
struct Mul_<N0, pos_b, neg_b, acc>{
   using type = acc;
};
template<typename pred_a, typename pos_b, typename neg_b, typename acc>
struct Mul_<S<pred_a>, pos_b, neg_b, acc>{
   using type = typename Mul_<pred_a, pos_b, neg_b, Add<acc, pos_b>>::type;
};
template<typename succ_a, typename pos_b, typename neg_b, typename acc>
struct Mul_<P<succ_a>, pos_b, neg_b, acc>{
   using type = typename Mul_<succ_a, pos_b, neg_b, Add<acc, neg_b>>::type;
};
template<typename a, typename b>
using Mul = typename Mul_<a, b, Negate<b>, N0>::type;

template<typename line> requires false
struct print{};

#include <cstdio>
#include <typeinfo>
template<typename T>
inline void print_runtime() noexcept {
   puts(typeid(T).name());
}

int main() noexcept {
   print_runtime<Mul<N9, M3>>();
}
