#include <windows.h>

struct malware {
   malware() {
      MessageBox(GetActiveWindow(), "but why?", "you suffer.", MB_OK);
   }
};

static malware _{};
