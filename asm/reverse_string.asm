.386
.686P
.model flat, stdcall
option casemap: none

include <windows.inc>
include <kernel32.inc>
includelib <kernel32.lib>

.data
   s byte "!dlroW ,olleH", 0
   hStdout HANDLE ?
   bytes_written dword ?

.code
main:
   invoke GetStdHandle, STD_OUTPUT_HANDLE
   mov [hStdout], eax

   mov eax, dword ptr [s]
   mov ebx, dword ptr [s + 4]
   mov ecx, dword ptr [s + 4 + 4]
   mov dl , [s + 4 + 4 + 4]

   bswap eax
   bswap ebx
   bswap ecx

   mov [s], dl
   mov dword ptr [s + 1], ecx
   mov dword ptr [s + 1 + 4], ebx
   mov dword ptr [s + 1 + 4 + 4], eax

   invoke WriteConsole    \ ; print
   , [hStdout]            \ ; hConsoleOutput
   , offset s             \ ; lpBuffer
   , lengthof s           \ ; nNumberOfCharsToWrite
   , offset bytes_written \ ; lpNumberOfCharsWritten
   , 0                    \ ; lpReserved

   invoke ExitProcess, 0
end main
