#include <fast_io.h>
#include <fast_io_device.h>
#include <ranges>

using namespace fast_io;

int main(int argc, char *argv[]) {
   using namespace mnp;

   if (argc < 2) {
      panic("usage:", mnp::chvw(argv[0]), " file.txt\n");
   }

   native_file_loader txt(argv[1]);
   std::ranges::replace(txt, '\n', ' ');
   print(txt);
}
