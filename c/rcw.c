// readconsolew isn't working for some stupid reason
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <stdio.h>
#include <stdlib.h>

HANDLE hStdin;
HANDLE hHeap;

int main() {
   hStdin = GetStdHandle(STD_INPUT_HANDLE);
   hHeap = GetProcessHeap();

   DWORD allocationSize = 0x10005;
   LPWSTR buf1 = HeapAlloc(hHeap, 0, allocationSize);
   LPWSTR buf2 = malloc(allocationSize);
   if (buf1 == NULL) {
      puts("buf1 is null");
   }
   if (buf2 == NULL) {
      puts("buf2 is null");
   }
   printf("Alright we're going to take input now\n> ");
   if (!ReadConsoleW(hStdin, buf2, allocationSize / 2, &allocationSize, NULL)) {
      printf("We died for some stupid reason. Error %lu\n", GetLastError());
   } else {
      puts("And we lived, great!");
   }
}
