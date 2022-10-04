#include <windows.h>
#include <stdio.h>

// https://en.wikipedia.org/wiki/ASCII
char *chcontrol[] = {
   "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "HT", "LF",
   "VT", "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK",
   "SYN", "ETB", "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US"
};

char *translate(char *in) {
   if ((size_t) *in < (sizeof(chcontrol) / sizeof(char *))) {
      return chcontrol[(size_t) *in];
   } else {
      return in;
   }
}

int main(void) {
   char buf[40] = {};
   __builtin_memset(buf, '_', 40);
   HANDLE hStdin = GetStdHandle(STD_INPUT_HANDLE);
   DWORD chars_read;
   ReadConsoleA(hStdin, buf, sizeof(buf), &chars_read, NULL);
   printf("Read %lu characters!\n", chars_read);
   for (size_t i = 0; i < sizeof(buf); i++) {
      char chstr[] = {buf[i], '\r', '\n', '\0'};
      char *final = translate(chstr);
      if (final == chstr) {
         printf("%s", chstr);
      } else {
         printf("%s\n", final);
      }
   }
}
