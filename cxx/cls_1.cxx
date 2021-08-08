#include <windows.h>
#include <string_view>

// Clear the windows console using virtual terminal escape codes!
int main() noexcept {
   auto const h_stdout{GetStdHandle(STD_OUTPUT_HANDLE)};

   DWORD original_mode{};
   if (!GetConsoleMode(h_stdout, &original_mode)) {
      return GetLastError();
   }

   // Hold original mode to restore on exit to be cooperative with other command-line apps.
   DWORD const new_mode{original_mode | ENABLE_VIRTUAL_TERMINAL_PROCESSING};

   // Try to set the mode.
   if (!SetConsoleMode(h_stdout, new_mode)) {
      return GetLastError();
   }

   // Write the sequence for clearing the display.
   DWORD written{};
   auto constexpr ansi_clear{L"\x1b[H\x1b[2J\x1b[3J"};
   auto constexpr length{std::wstring_view(ansi_clear).length()};
   if (!WriteConsoleW(h_stdout, ansi_clear, length, &written, NULL)) {
      // If we fail, try to restore the mode on the way out.
      SetConsoleMode(h_stdout, original_mode);
      // Don't care about the error because we're already screwed
      return GetLastError();
   }

   SetConsoleMode(h_stdout, original_mode);

   return 0;
}
