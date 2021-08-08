bits 64
default rel

extern GetStdHandle
extern WriteConsoleW
extern ExitProcess

STD_OUTPUT_HANDLE equ -11

section .data
   strTest dw __utf16__('Hello, World'), 10, 0
   hStdout dd 0
   charsWritten dd 0

section .text
global start
start:
   mov rcx, STD_OUTPUT_HANDLE
   call GetStdHandle
   mov [hStdout], eax
   mov r15, 10  ; number of times we will say hello
l1:
   mov rcx, [hStdout]
   lea rdx, strTest
   mov r8 , 14
   lea r9 , [charsWritten]
   push 0 ; lpReserved
   sub rsp, 32 ; shadow store
   call WriteConsoleW
   add rsp, 32
   add rsp, 8

   dec r15
   jnz l1
l1.end:
   xor rcx, rcx
   call ExitProcess

