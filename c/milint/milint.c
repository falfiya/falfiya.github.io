#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <limits.h>

__declspec(dllimport)
BOOLEAN SystemFunction036(
   PVOID RandomBuffer,
   ULONG RandomBufferLength
);

// ten million
#define COUNT 10000000
#define LONGEST_INT_STRING "-2147483648"
#define BUF_SIZE (COUNT * sizeof(LONGEST_INT_STRING))
#define INT_BUF_SIZE (COUNT * sizeof(int))

// put the random ints into the back part of the heap
#define INT_BUF_OFFSET (BUF_SIZE - INT_BUF_SIZE)

#pragma comment(linker, "/entry:start")
void start() {
   HANDLE hHeap = GetProcessHeap();
   void *buf = HeapAlloc(hHeap, 0, BUF_SIZE);
   char *fulBuf = buf;
   int *intBuf = buf + INT_BUF_OFFSET;
   SystemFunction036(intBuf, INT_BUF_SIZE);
   for (size_t i = 0; i < COUNT; i++) {
      int curr = intBuf[i];
      if (curr < 0) {
         *fulBuf = '-';
         fulBuf++;
         curr = -curr;
      }
      int order;
      if (curr < 10) {
         order = 1;
      } else if (curr < 100) {
         order = 10;
      } else if (curr < 1000) {
         order = 100;
      } else if (curr < 10000) {
         order = 1000;
      } else if (curr < 100000) {
         order = 10000;
      } else if (curr < 1000000) {
         order = 100000;
      } else if (curr < 10000000) {
         order = 1000000;
      } else if (curr < 100000000) {
         order = 10000000;
      } else if (curr < 1000000000) {
         order = 100000000;
      } else {
         order = 1000000000;
      }
      while (1) {
         *fulBuf = '0' + (curr / order);
         fulBuf++;
         curr = curr % order;
         if (order == 1) {
            goto finishStringification;
         } else {
            order /= 10;
         }
      }
      finishStringification:
      *fulBuf = '\n';
      fulBuf++;
   }
   DWORD length = ((size_t) fulBuf) - ((size_t) buf);
   HANDLE hStdout = GetStdHandle(STD_OUTPUT_HANDLE);
   WriteConsoleA(hStdout, buf, length, NULL, NULL);
   ExitProcess(0);
}
