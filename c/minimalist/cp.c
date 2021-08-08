#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <shellapi.h>

void start(void) {
   int argc;
   PWSTR *const restrict argv = CommandLineToArgvW(GetCommandLineW(), &argc);

   if (argc != 3) {
      #define mUsage L"cp.exe from to"
      DWORD chars_written;
      WriteConsoleW(
         GetStdHandle(STD_ERROR_HANDLE),
         mUsage,
         sizeof(mUsage) / sizeof(WCHAR),
         &chars_written,
         NULL
      );
      ExitProcess(1);
      __builtin_unreachable();
   }

   DWORD code = 0;
   if (!CopyFileW(argv[1], argv[2], FALSE)) {
      code = GetLastError();
   }
   ExitProcess(0);
   __builtin_unreachable();
}
