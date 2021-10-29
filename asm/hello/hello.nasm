bits 64

extern GetStdHandle
extern WriteConsoleA
extern ExitProcess

section .text
global start
greeting:
   db 'Hello, World!'
start:
   mov rcx, -11
   call GetStdHandle
   mov rcx, rax
   mov rdx, greeting
   mov r8 , 13
   mov r9 , rsp
   call WriteConsoleA
   xor ecx, ecx
   call ExitProcess
