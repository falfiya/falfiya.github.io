#include <windows.h>
#include <stdio.h>

int main() {
   PCWSTR const file = L"src/realpath.c";
   DWORD const len = GetFullPathNameW(
      file,
      0,
      NULL,
      NULL
   );

   PWSTR realpath = _alloca(len * sizeof(WCHAR));
   GetFullPathNameW(file, len, realpath, NULL);
   wprintf(L"%s -> %s", file, realpath);
}
