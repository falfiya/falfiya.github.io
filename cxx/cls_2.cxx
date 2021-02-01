#include <windows.h>

int main() noexcept {
   auto const h_stdout{GetStdHandle(STD_OUTPUT_HANDLE)};
   CONSOLE_SCREEN_BUFFER_INFO screen_info{};

   if (!GetConsoleScreenBufferInfo(h_stdout, &screen_info)) {
      return GetLastError();
   }

   SMALL_RECT const scroll_rect{
      .Left = 0,
      .Top  = 0,
      .Right  = screen_info.dwSize.X,
      .Bottom = screen_info.dwSize.Y,
   };

   COORD const scroll_target{0, static_cast<short>(-screen_info.dwSize.Y)};

   CHAR_INFO const fill{
      .Char{.UnicodeChar = L' '},
      .Attributes = screen_info.wAttributes,
   };

   ScrollConsoleScreenBufferW(h_stdout, &scroll_rect, NULL, scroll_target, &fill);

   SetConsoleCursorPosition(h_stdout, {0, 0});
}
