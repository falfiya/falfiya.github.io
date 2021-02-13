#include <iostream>
#include <filesystem>

using namespace std;

namespace fs = std::filesystem;

inline void clean_dir(string const dir) noexcept {
   for (auto &&dirent : fs::directory_iterator(dir)) {
      if (!dirent.is_regular_file()) {
         continue;
      }
      auto path{fs::absolute(dirent.path())};
      if (!path.has_extension()) {
         continue;
      }
      auto ext{path.extension()};
      auto name{path.string()};
      if (ext == ".exe" || ext == ".ilk" || ext == ".pdb") {
         try {
            cout << "TRY  " << name << '\n';
            fs::remove(path);
            cout << "DEL\n";
         } catch (...) {
            cout << "FAIL\n";
         }
      }
   }
}

int main() noexcept {
   clean_dir(".\\c");
   clean_dir(".\\cxx");
}
