// this is windows only obviously
// https://www.cplusplus.com/articles/4z18T05o/
#include <conio.h>
#include <windows.h>
#include <corecrt_terminate.h>

/// returns true on error
inline bool cls_one() noexcept {
   auto stdout_handle{GetStdHandle(STD_OUTPUT_HANDLE)};
   if (stdout_handle == INVALID_HANDLE_VALUE) {
      terminate();
   }

   CONSOLE_SCREEN_BUFFER_INFO console_info{};
   int success;
   success = {GetConsoleScreenBufferInfo(stdout_handle, &console_info)};
   if (!success) {
      return true;
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
      return true;
   }

   success = {SetConsoleCursorPosition(stdout_handle, {0, 0})};

   if (!success) {
      return true;
   }

   return false;
}

int main() {
   clear_console();
   // int c{'a'};
   // while (true) {
   //    _clrscr()
   //    while (_kbhit()) {
   //       c = {_getch_nolock()};
   //    }
   //    _putch_nolock(c);
   //    Sleep(500);
   // }
}
