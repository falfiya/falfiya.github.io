// clang++ space_cat.cxx -fno-rtti -fno-exceptions -std=c++20 -Os -fuse-ld=lld -flto --for-linker=--strip-all -o space_cat.exe
#include <fast_io.h>
#include <fast_io_device.h>
#include <ranges>

using namespace fast_io;
using namespace std;

int main(int argc, char *argv[]) {
   using namespace mnp;

   if (argc < 2) {
      panic("usage:", chvw(argv[0]), " file.txt\n");
   }

   native_file_loader txt(argv[1]);
   std::ranges::replace(txt, '\n', ' ');
   print(txt);
}
