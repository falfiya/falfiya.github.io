#ifdef _WIN32
#include "windows.h"

int main() {
   system("ipconfig -release && ipconfig -renew");
}
#else
#error "marcus.c uses windows.h and ipconfig"
#endif
