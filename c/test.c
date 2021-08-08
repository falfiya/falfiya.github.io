#include <windows.h>

HANDLE hStdout;
DWORD charsWritten;

void write(void) {
   WriteConsoleW(hStdout, L"Hello, World!", 14, &charsWritten, 0);
}

int main() {
   hStdout = GetStdHandle(STD_OUTPUT_HANDLE);
   write();
   write();
   write();
   return 0;
}
