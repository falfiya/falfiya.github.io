typedef unsigned long long u64;

struct u128 { u64 a; u64 b; };

extern void divider() noexcept asm("--------");
inline void clobber() noexcept {
   divider();
   asm("" : : :
      "rax", "rbx", "rcx", "rdx", "rsi", "rdi",
      "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15"
   );
}

extern "C" {
   __attribute__((ms_abi))
   void msvc(u128) noexcept;

   // clang recognizes "regcall" but does not produce different output on windows
   __attribute__((regcall))
   void regcall(u128) noexcept;

   // works on windows :)
   __attribute__((sysv_abi))
   void sysv(u128) noexcept;

   // want u128 spread into two registers
   void desired(u64, u64) noexcept;
}

int main() noexcept {
   u128 val{123, 456};
   clobber(); msvc(val);
   clobber(); regcall(val);
   clobber(); sysv(val);
   clobber(); desired(val.a, val.b);
}
