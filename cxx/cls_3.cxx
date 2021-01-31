// example 3 of
// https://docs.microsoft.com/en-us/windows/console/clearing-the-screen
#include <conio.h>
#include <windows.h>
#include <corecrt_terminate.h>

int main() {
   auto stdout_handle{GetStdHandle(STD_OUTPUT_HANDLE)};
   if (stdout_handle == INVALID_HANDLE_VALUE) {
      terminate();
   }

   CONSOLE_SCREEN_BUFFER_INFO console_info{};
   int success;
   success = {GetConsoleScreenBufferInfo(stdout_handle, &console_info)};
   if (!success) {
      return 1;
   }

   auto console_buf_size{console_info.dwSize.X * console_info.dwSize.Y};

   DWORD chars_written{};
   success = {
      FillConsoleOutputCharacterW(
         stdout_handle,
         L' ',
        console_buf_size,
        {0, 0},
        &chars_written
      )
   };

   if (!success) {
      return 1;
   }

   success = {SetConsoleCursorPosition(stdout_handle, {0, 0})};

   if (!success) {
      return 1;
   }

   return 0;
}
