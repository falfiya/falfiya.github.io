target triple = "x86_64-pc-windows-msvc"
declare dllimport i8* @GetStdHandle(i32) local_unnamed_addr
declare dllimport i32 @WriteConsoleA(i8*, i8*, i32, i32*, i8*) local_unnamed_addr
declare dllimport i32 @GetLastError() local_unnamed_addr

define i32 @start() nounwind {
e:
   %stdout = call i8* @GetStdHandle(i32 -11)
   %greeting = alloca [13 x i8], align 1
   store [13 x i8] c"Hello, World!", [13 x i8]* %greeting
   %greeting_ptr = bitcast [13 x i8]* %greeting to i8*
   %chars_written = alloca i32
   %res = call i32 @WriteConsoleA(
      i8* %stdout,
      i8* %greeting_ptr,
      i32 13,
      i32* %chars_written,
      i8* null
   )
   %success = icmp ne i32 %res, 0
   br i1 %success, label %good, label %bad
good:
   ret i32 0
bad:
   %err = call i32 @GetLastError()
   ret i32 %err
}

; !llvm.linker.options = !{!0, !1}
; !0 = !{!"/subsystem:windows"}
; !1 = !{!"/entry:start"}
