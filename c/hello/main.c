typedef void *HANDLE;
typedef unsigned long DWORD;
typedef int BOOL;

#define STD_OUTPUT_HANDLE ((DWORD) -11)

__declspec(dllimport) HANDLE GetStdHandle(DWORD);
__declspec(dllimport) BOOL WriteConsoleA(
   HANDLE where,
   char const *text,
   DWORD charsToWrite,
   DWORD *amountWritten,
   void *reservedAlwaysNull
);
__attribute__((noreturn))
__declspec(dllimport) void ExitProcess(DWORD);

#pragma comment(linker, "/entry:start")
#pragma comment(linker, "/subsystem:console")
void start(void) {
   HANDLE const handleToStdout = GetStdHandle(STD_OUTPUT_HANDLE);

   char const greeting[] = "Hello, World!";
   DWORD charsWritten;
   WriteConsoleA(
      handleToStdout,
      greeting,
      sizeof(greeting) - 1,
      &charsWritten,
      0
   );

   ExitProcess(0);
}
