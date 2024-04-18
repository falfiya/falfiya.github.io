template <size_t n>
struct fib {
   static constexpr size_t val{fib<n - 2>::val + fib<n - 1>::val};
};

template <>
struct fib<1> {
   static constexpr size_t val{1};
};

template <>
struct fib<0> {
   static constexpr size_t val{0};
};

constexpr auto pain = fib<6>::val;
