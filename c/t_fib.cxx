#define v static constexpr unsigned

template<v n>
struct fibonacci {
   v value = fibonacci<n-1>::value + fibonacci<n-2>::value;
};

template<>
struct fibonacci<0> {
   v value = 0;
};

template<>
struct fibonacci<1> {
   v value = 1;
};
