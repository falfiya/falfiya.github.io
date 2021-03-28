#include <windows.h>
#include <tlhelp32.h>
#include <psapi.h>

#include <string.h>
#include <stdio.h>

#define false 0
#define true 1
#define null NULL

int main() {
   HANDLE const snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);

   if (snap == INVALID_HANDLE_VALUE) {
      return 1;
   }

   PROCESSENTRY32W pentry = {.dwSize = sizeof(PROCESSENTRY32W)};

   if (!Process32FirstW(snap, &pentry)) {
      CloseHandle(snap);
      return 1;
   }

   wprintf(L"%5s | %-37s | path\n", L"pid", L"exe");
   do {
      wprintf(L"%5lu | %-37s | ", pentry.th32ProcessID, pentry.szExeFile);

      if (wcscmp(pentry.szExeFile, L"svchost.exe") == 0) {
         wprintf(L"\n");
         continue;
      }

      HANDLE const process = OpenProcess(
         PROCESS_QUERY_INFORMATION,
         0,
         pentry.th32ProcessID
      );

      WCHAR path[MAX_PATH];
      if (true
         && process != NULL
         && GetModuleFileNameExW(process, null, path, sizeof(path))
      ) {
         wprintf(L"%s\n", path);
      } else {
         putchar('\n');
      }
   } while (Process32NextW(snap, &pentry));

   CloseHandle(snap);
}
