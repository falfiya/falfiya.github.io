#include <wchar.h>

enum ParseMode {
   PS_NORMAL,
   PS_ESCAPE,
   PS_STRING,
};

struct ParseState {
   enum ParseMode Mode;
   union {
      unsigned int PS_ESCAPE_COUNT;
   } ModeState;
};

wchar_t **CommandLineToArgvW(wchar_t const *restrict commandLine, int *const restrict argc) {
   register int first_argc = 0;
   register struct ParseState state = {
      .Mode = PS_NORMAL,
      .ModeState = {0}
   };
   for (
      wchar_t const *restrict commandLine_rh = commandLine;
      *commandLine_rh;
      ++commandLine_rh
   ) {
      switch (state.Mode) {
      case PS_NORMAL:
         
      }
   }
}
