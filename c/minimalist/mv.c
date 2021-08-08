#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <shellapi.h>

void start(void) {
   int argc;
   PWSTR *const restrict argv = CommandLineToArgvW(GetCommandLineW(), &argc);

   if (argc != 3) {
      WCHAR usage[] = L"mv.exe from to";
      DWORD charsWritten;
      WriteFile(
         GetStdHandle(STD_ERROR_HANDLE),
         usage,
         sizeof(usage) / sizeof(WCHAR) - 1,
         &charsWritten,
         NULL
      );
      ExitProcess(1);
      __builtin_unreachable();
   }

   DWORD code = 0;
   if (!MoveFileW(argv[1], argv[2])) {
      code = GetLastError();
   }
   ExitProcess(0);
   __builtin_unreachable();
}
