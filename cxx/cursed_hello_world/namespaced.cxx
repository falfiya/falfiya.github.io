using HANDLE = void *;
using DWORD = unsigned long;
using BOOL = int;

constexpr DWORD STD_OUTPUT_HANDLE = -11;

namespace win32 {
   __declspec(dllimport) HANDLE GetStdHandle(DWORD) noexcept
      asm("GetStdHandle");

   __declspec(dllimport) BOOL WriteConsoleA(
      HANDLE where,
      char const *text,
      DWORD charsToWrite,
      DWORD *amountWritten,
      void *reservedAlwaysNull
   ) noexcept
      asm("WriteConsoleA");
}

int start() noexcept {
   HANDLE const handleToStdout = win32::GetStdHandle(STD_OUTPUT_HANDLE);

   char const greeting[] = "Hello, World!";
   DWORD charsWritten;
   win32::WriteConsoleA(
      handleToStdout,
      greeting,
      sizeof(greeting) - 1,
      &charsWritten,
      0
   );

   return 0;
}
