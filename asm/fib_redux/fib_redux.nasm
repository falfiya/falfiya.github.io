bits 64
default rel

extern GetStdHandle
extern WriteConsoleW
extern WriteFile
extern ExitProcess

;  extern bool WriteConsoleW(
;     u64 in rcx hConsoleOutput
;     u64 in rdx lpBuffer
;     u32 in r8  charsToWrite
;     u64 in r9  bytesWritten
;     u64 in stk lpReserved
; );

STD_OUTPUT_HANDLE equ -11

section .data
   u64Str: resb 20
   lf: db 10
   strTest dw __utf16__('Hello, World'), 10, 0

section .bss
   hStdout: resd 1
   bytesWritten: resd 1

section .text
global start
global written
global sayHello
start:
   mov rcx, STD_OUTPUT_HANDLE
   call GetStdHandle
   mov [hStdout], eax

   xor r12, r12 ; a = 0
   mov r13, 1   ; b = 1
   mov r14, 30  ; c = 30

   mov r15, 10  ; divisor is 10
   l1:
      mov rcx, lf ; char *
      mov rax, r12
      test rax, rax
      jnz aToStr
         dec rcx
         mov byte [rcx], '0'
      jmp aToStr.end
      aToStr:
         dec rcx
         xor rdx, rdx
         div r15
         mov byte [rcx], al
         add byte [rcx], '0'
         test rax, rax
         jnz aToStr
      aToStr.end:
      ; print u64Str
      ; mov rcx, [hStdout]    ; hConsoleOutput
      ; mov rdx, u64Str       ; lpBuffer
      ; mov r8 , lf           ; bufCount
      ; sub r8 , rdx
      ; mov r9 , bytesWritten ; bytesWritten
      ; push 0                ; lpOverlapped
      ; call WriteConsoleA
   sayHello:
      mov rcx, [hStdout]
      lea rdx, strTest
      mov r8 , 14
      mov r9 , bytesWritten
      sub rsp, 8 * 5
      mov qword [rsp + 8 * 4], 0
      call WriteConsoleW
      add rsp, 8 * 5
   written:
      xchg r12, r13 ; a <> b
      add r13, r12  ; b += a
      dec r14
      jnz l1
   l1.end:
   xor rcx, rcx
   call ExitProcess

