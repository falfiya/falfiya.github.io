#define WIN32_LEAN_AND_MEAN
#include <winternl.h>
#include <windows.h>

#define STATUS_SUCCESS 0
#ifndef NTSTATUS
#define NTSTATUS unsigned int
#endif

enum class SecurityEntity {
   SeCreateTokenPrivilege          = 1,
   SeAssignPrimaryTokenPrivilege   = 2,
   SeLockMemoryPrivilege           = 3,
   SeIncreaseQuotaPrivilege        = 4,
   SeUnsolicitedInputPrivilege     = 5,
   SeMachineAccountPrivilege       = 6,
   SeTcbPrivilege                  = 7,
   SeSecurityPrivilege             = 8,
   SeTakeOwnershipPrivilege        = 9,
   SeLoadDriverPrivilege           = 10,
   SeSystemProfilePrivilege        = 11,
   SeSystemtimePrivilege           = 12,
   SeProfileSingleProcessPrivilege = 13,
   SeIncreaseBasePriorityPrivilege = 14,
   SeCreatePagefilePrivilege       = 15,
   SeCreatePermanentPrivilege      = 16,
   SeBackupPrivilege               = 17,
   SeRestorePrivilege              = 18,
   SeShutdownPrivilege             = 19,
   SeDebugPrivilege                = 20,
   SeAuditPrivilege                = 21,
   SeSystemEnvironmentPrivilege    = 22,
   SeChangeNotifyPrivilege         = 23,
   SeRemoteShutdownPrivilege       = 24,
   SeUndockPrivilege               = 25,
   SeSyncAgentPrivilege            = 26,
   SeEnableDelegationPrivilege     = 27,
   SeManageVolumePrivilege         = 28,
   SeImpersonatePrivilege          = 29,
   SeCreateGlobalPrivilege         = 30,
   SeTrustedCredManAccessPrivilege = 31,
   SeRelabelPrivilege              = 32,
   SeIncreaseWorkingSetPrivilege   = 33,
   SeTimeZonePrivilege             = 34,
   SeCreateSymbolicLinkPrivilege   = 35,
};

using RtlAdjustPrivilege_t = NTSTATUS (NTAPI *const)(
   _In_  SecurityEntity Privilege,
   _In_  BOOLEAN        Enable,
   _In_  BOOLEAN        CurrentThread,
   _Out_ PBOOLEAN       Enabled
);

struct UNICODE_STRING {
   USHORT Length;
   USHORT MaximumLength;
   PWSTR  Buffer;
   WCHAR  data[];
};

using PUNICODE_STRING = UNICODE_STRING *;
using PPVOID = PVOID *;

enum class HARDERROR_RESPONSE_OPTION {
   OptionAbortRetryIgnore,
   OptionOk,
   OptionOkCancel,
   OptionRetryCancel,
   OptionYesNo,
   OptionYesNoCancel,
   OptionShutdownSystem
};

enum class HARDERROR_RESPONSE {
   ResponseReturnToCaller,
   ResponseNotHandled,
   ResponseAbort,
   ResponseCancel,
   ResponseIgnore,
   ResponseNo,
   ResponseOk,
   ResponseRetry,
   ResponseYes
};

using PHARDERROR_RESPONSE = HARDERROR_RESPONSE *;

using NtRaiseHardError_t = NTSTATUS (NTAPI *const)(
   _In_     NTSTATUS                   ErrorStatus,
   _In_     ULONG                      NumberOfParameters,
   _In_opt_ PUNICODE_STRING            UnicodeStringParameterMask,
   _In_     PPVOID                     Parameters,
   _In_     HARDERROR_RESPONSE_OPTION  ResponseOption,
   _Out_    PHARDERROR_RESPONSE        Response
) noexcept;

int wmain() noexcept {
   HMODULE ntdll{GetModuleHandleW(L"ntdll.dll")};
   auto RtlAdjustPrivilege{
      reinterpret_cast<RtlAdjustPrivilege_t>(
         GetProcAddress(ntdll, "RtlAdjustPrivilege")
      )
   };
   auto NtRaiseHardError{
      reinterpret_cast<NtRaiseHardError_t>(
         GetProcAddress(ntdll, "NtRaiseHardError")
      )
   };

   BOOLEAN res1;
   RtlAdjustPrivilege(
      SecurityEntity::SeShutdownPrivilege,
      true,
      false,
      &res1
   );

   HARDERROR_RESPONSE res2;
   NtRaiseHardError(
      STATUS_FLOAT_MULTIPLE_FAULTS,
      0,
      nullptr,
      nullptr,
      HARDERROR_RESPONSE_OPTION::OptionShutdownSystem,
      &res2
   );
}
