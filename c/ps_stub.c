#define UNICODE
#include <process.h>

static wchar_t *posh = L"C:\\Program Files\\PowerShell\\6\\pwsh.exe";

int wmain(int _, const wchar_t **argv) {
   return *((int *) _wexecv(posh, argv));
}
