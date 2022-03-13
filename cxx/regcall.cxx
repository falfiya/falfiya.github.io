#ifndef size_t
using size_t = unsigned long long;
#endif

template<typename T>
struct span {
   size_t sz;
   T *ptr;

   template<size_t sz>
   constexpr span(T (&ary)[sz]): sz{sz}, ptr{ary} {}
};

template<typename T>
__attribute__((ms_abi))
extern void take_msvc(span<T>) noexcept asm("take_msvc");

template<typename T>
__attribute__((regcall))
extern void take_regcall(span<T>) noexcept asm("take_regcall");

int main() noexcept {
   int ary[] {1, 2, 3, 4, 5};
   auto val{span{ary}};
   take_msvc(val);
   take_regcall(val);
}

// clang -S -masm=intel -fverbose-asm -Ofast --std=c++17 regcall.cxx -o regcall.s
