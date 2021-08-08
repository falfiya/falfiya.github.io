; how to debug
; break _start
; start
; si repeatedly
; p (char [20]) u64Str
; x /c $rsi
bits 64
default rel

section .data
   u64Str: times 20 db 0
   lf: db 10

section .text
global _start
_start:
   xor r12, r12 ; a = 0
   mov r13, 1   ; b = 1
   mov r15, 10  ; divisor is 10
   xor bl, bl   ; last chance flag
   fib:
      mov rsi, lf ; char *
      mov rax, r12
      test rax, rax
      jnz aToStr
         dec rsi
         mov byte [rsi], '0'
      jmp aToStr.end
      aToStr:
         dec rsi
         xor rdx, rdx
         div r15
         mov byte [rsi], dl
         add byte [rsi], '0'
         test rax, rax
         jnz aToStr
      aToStr.end:
      mov rax, 1 ; write
      mov rdi, 1 ; stdout
      mov rdx, lf + 1
      sub rdx, rsi
      syscall
      test bl, bl ; was this our last chance before carry?
      jnz fib.end
      xchg r12, r13 ; a <> b
      add r13, r12 ; b += a
      jnc fib
      mov bl, 1
      jmp fib
   fib.end:
   mov rax, 60 ; exit
   xor rdi, rdi
   syscall
