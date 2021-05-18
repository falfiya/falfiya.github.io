// partial credit to TheWover
// https://gist.github.com/TheWover/c7804fd541f5e458151220e5ab15bcf5
#define WIN32_LEAN_AND_MEAN
#include <winternl.h>
#include <stdio.h>
#include <windows.h>

#define STATUS_SUCCESS 0
#ifndef NTSTATUS
#define NTSTATUS unsigned int
#define STATUS_INFO_LENGTH_MISMATCH 0xC0000004
#endif

using NtGetNextProcess = NTSTATUS (NTAPI *const)(
   _In_  HANDLE ProcessHandle,
   _In_  ACCESS_MASK DesiredAccess,
   _In_  ULONG HandleAttributes,
   _In_  ULONG Flags,
   _Out_ PHANDLE NewProcessHandle
) noexcept;

struct UNICODE_STRING {
   USHORT Length;
   USHORT MaximumLength;
   PWSTR  Buffer;
   WCHAR  data[];
};

enum class ProcessInfoClass {
   ProcessBasicInformation = 0,
   ProcessDebugPort = 7,
   ProcessWow64Information = 26,
   ProcessImageFileName = 27,
   ProcessBreakOnTermination = 29,
   ProcessSubsystemInformation = 75,
};

using NtQueryInformationProcess = NTSTATUS (NTAPI *const)(
   _In_  HANDLE           ProcessHandle,
   _In_  ProcessInfoClass ProcessInformationClass,
   _Out_ PVOID            ProcessInformation,
   _In_  ULONG            ProcessInformationLength,
   _Out_ PULONG           ReturnLength
);

int main() noexcept {
   HMODULE ntdll{GetModuleHandleW(L"ntdll.dll")};

   auto NtGetNextProcess{
      reinterpret_cast<::NtGetNextProcess>(
         GetProcAddress(ntdll, "NtGetNextProcess")
      )
   };

   auto NtQueryInformationProcess{
      reinterpret_cast<::NtQueryInformationProcess>(
         GetProcAddress(ntdll, "NtQueryInformationProcess")
      )
   };

   HANDLE proc{nullptr};
   while (NtGetNextProcess(proc, MAXIMUM_ALLOWED, 0, 0, &proc) == STATUS_SUCCESS) {
      char buf[sizeof(UNICODE_STRING) + MAX_PATH];
      ULONG return_length;
      auto status{NtQueryInformationProcess(
         proc,
         ProcessInfoClass::ProcessImageFileName,
         &buf,
         sizeof(buf),
         &return_length
      )};

      auto filename{reinterpret_cast<UNICODE_STRING *>(buf)};

      if (status != STATUS_SUCCESS) {
         printf("oh no.%#x\n", status);
      } else {
         wprintf(L"%s\n", filename->data);
         // wprintf(
         //    L"start  = %p\n"
         //    L"length = %hu\n"
         //    L"maxlen = %hu\n"
         //    L"buffer = %p\n"
         //    L"data   = %p\n",
         //    filename,
         //    filename->Length,
         //    filename->MaximumLength,
         //    filename->Buffer,
         //    filename->data
         // );
      }
   }
}
