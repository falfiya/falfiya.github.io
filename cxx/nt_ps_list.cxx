#define WIN32_LEAN_AND_MEAN
#include <stdio.h>
#include <windows.h>
#include <psapi.h> // GetModuleFileNameExW

#pragma comment(lib, "psapi")
#define STATUS_SUCCESS 0

using NtGetNextProcess = int (NTAPI *const)(
   _In_  HANDLE ProcessHandle,
   _In_  ACCESS_MASK DesiredAccess,
   _In_  ULONG HandleAttributes,
   _In_  ULONG Flags,
   _Out_ PHANDLE NewProcessHandle
) noexcept;

int main() noexcept {
   HMODULE ntdll{GetModuleHandleW(L"ntdll.dll")};

   auto NtGetNextProcess{
      reinterpret_cast<::NtGetNextProcess>(
         GetProcAddress(ntdll, "NtGetNextProcess")
      )
   };

   HANDLE proc{nullptr};
   while (NtGetNextProcess(proc, MAXIMUM_ALLOWED, 0, 0, &proc) == STATUS_SUCCESS) {
      DWORD pid{GetProcessId(proc)};
      WCHAR name[MAX_PATH];
      DWORD name_len{GetModuleFileNameExW(proc, nullptr, name, MAX_PATH)};
      name[name_len] = L'\0';
      if (name_len) {
         wprintf(L"PID: %d\tNAME: %s\n", pid, name);
      } else {
         wprintf(L"PID: %d\n", pid);
      }
   }
}
