// see "Parsing C++ Command-Line Arguments (C++)"
// https://docs.microsoft.com/en-us/previous-versions/17w5ykft(v=vs.85)
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <shellapi.h>

#pragma comment(lib, "kernel32.lib")
#pragma comment(lib, "shell32.lib")
#pragma comment(linker, "/entry:start")
#pragma comment(linker, "/subsystem:console")

#define sInitial L"CommandLineW:\n   "
wchar_t iobuf[0x1000] = sInitial;

#define QWORD_PTR *(unsigned long long *)
#define DWORD_PTR *(DWORD *)

void start(void) {
   PCWSTR cmdline = GetCommandLineW();
   register wchar_t *restrict iobuf_wh = iobuf + sizeof(sInitial) / sizeof(wchar_t);
   for (PCWSTR cmdline_rh = cmdline; *cmdline_rh; *iobuf_wh++ = *cmdline_rh++);
   *iobuf_wh++ = L'\n';

   // iobuf += "argv/argc:\n   argc "
   QWORD_PTR iobuf_wh = QWORD_PTR L"Argv" ; iobuf_wh += 4;
   QWORD_PTR iobuf_wh = QWORD_PTR L"W:\n "; iobuf_wh += 4;
   QWORD_PTR iobuf_wh = QWORD_PTR L"  ar" ; iobuf_wh += 4;
   QWORD_PTR iobuf_wh = QWORD_PTR L"gc "  ; iobuf_wh += 3;

   int argc;
   unsigned char one_extra_space = 0;
   PCWSTR *argv = (PCWSTR *) CommandLineToArgvW(cmdline, &argc);
   if (argc < 10) {
      QWORD_PTR iobuf_wh = QWORD_PTR L"   ="; iobuf_wh += 4;
      *iobuf_wh++ = L' ';
      *iobuf_wh++ = L'0' + argc;
   } else if (argc < 100) {
      QWORD_PTR iobuf_wh = QWORD_PTR L"    "; iobuf_wh += 4;
      DWORD_PTR iobuf_wh = DWORD_PTR L"= "; iobuf_wh += 2;
      one_extra_space = 1;
      *iobuf_wh++ = L'0' + argc / 10;
      *iobuf_wh++ = L'0' + argc % 10;
   } else {
      DWORD_PTR iobuf_wh = DWORD_PTR L" ="; iobuf_wh += 2;
      *iobuf_wh++ = L'?';
   }
   *iobuf_wh++ = L'\n';

   for (int i = 0; i < argc; ++i) {
      QWORD_PTR iobuf_wh = QWORD_PTR L"   a"; iobuf_wh += 4;
      QWORD_PTR iobuf_wh = QWORD_PTR L"rgv["; iobuf_wh += 4;
      if (i < 10) {
         if (one_extra_space) {
            *iobuf_wh++ = L' ';
         }
         *iobuf_wh++ = L'0' + i;
      } else if (i < 100) {
         *iobuf_wh++ = L'0' + i / 10;
         *iobuf_wh++ = L'0' + i % 10;
      } else {
         *iobuf_wh++ = L'?';
      }
      QWORD_PTR iobuf_wh = QWORD_PTR L"] = "; iobuf_wh += 4;
      for (PCWSTR arg_rh = argv[i]; *arg_rh; *iobuf_wh++ = *arg_rh++);
      *iobuf_wh++ = L'\n';
   }
   DWORD charsWritten;
   WriteConsoleW(
      GetStdHandle(STD_OUTPUT_HANDLE),
      iobuf,
      iobuf_wh - iobuf,
      &charsWritten,
      NULL
   );

   ExitProcess(0);
   __builtin_unreachable();
}

