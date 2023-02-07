#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <stdio.h>

int div_even(int i) {
   if (i % 2 == 0) {
      return i / 2;
   } else {
      ULONG_PTR exceptionArguments[1] = {
         (ULONG_PTR) "Cannot divide odd number!"
      };
      RaiseException(0, EXCEPTION_NONCONTINUABLE_EXCEPTION, 1, exceptionArguments);
      __builtin_unreachable();
   }
}

LPEXCEPTION_POINTERS lastPointers;
int filter(LPEXCEPTION_POINTERS ep) {
   lastPointers = ep;
   return 1;
}

int main(void) {
   __try {
      div_even(1);
   }
   __except(filter(GetExceptionInformation())) {
      char const *msg = (void *) lastPointers->ExceptionRecord->ExceptionInformation[0];
      printf("Exception thrown in main:\n   %s\n", msg);
   }
   return 0;
}
