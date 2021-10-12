target triple = "x86_64-pc-windows-msvc"
declare dllimport i8* @GetStdHandle(i32)
declare dllimport i32 @WriteConsoleA(i8*, i8*, i32, i32*, i8*)
declare dllimport void @ExitProcess(i32)

define i32 @start() nounwind {
   %stdout = call i8* @GetStdHandle(i32 -11)
   %greeting = alloca [13 x i8], align 1
   store [13 x i8] c"Hello, World!", [13 x i8]* %greeting
   %greeting_ptr = bitcast [13 x i8]* %greeting to i8*
   %chars_written = alloca i32
   call i32 @WriteConsoleA(
      i8* %stdout,
      i8* %greeting_ptr,
      i32 13,
      i32* %chars_written,
      i8* null
   )
   call void @ExitProcess(i32 0)
   unreachable
}

!llvm.linker.options = !{!0, !1}
!0 = !{!"/subsystem:console"}
!1 = !{!"/entry:start"}
