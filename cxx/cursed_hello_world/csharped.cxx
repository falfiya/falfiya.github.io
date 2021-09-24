using HANDLE = void *;
using DWORD = unsigned long;
using BOOL = int;

struct ConsoleAPI {
   HANDLE h;

   static inline ConsoleAPI *from(DWORD const n) noexcept {
      return (ConsoleAPI *) ConsoleAPI::GetStdHandle(n);
   }

   __declspec(dllimport) BOOL WriteLine(char const *, DWORD, DWORD *, void * = 0)
      const noexcept asm("WriteConsoleA");

   private:
   __declspec(dllimport) static HANDLE GetStdHandle(DWORD)
      noexcept asm("GetStdHandle");
};

constexpr DWORD STD_OUTPUT_HANDLE = -11;

int start() noexcept {
   ConsoleAPI const *const Console{ConsoleAPI::from(STD_OUTPUT_HANDLE)};

   char const greeting[] = "Hello, World!";
   DWORD charsWritten;
   Console->WriteLine(greeting, sizeof(greeting) - 1, &charsWritten);

   return 0;
}
