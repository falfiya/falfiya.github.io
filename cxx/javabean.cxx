#include <iostream>
#include <filesystem>

using namespace std;
namespace fs = filesystem;

int main() {
	auto dir_iter = (
		fs::recursive_directory_iterator(
			".",
			fs::directory_options::skip_permission_denied
		)
	);

	for (auto &dirent : dir_iter) {
		auto path = dirent.path();
		if (dirent.is_regular_file() && path.extension() == ".class") {
			cout << "BEAN " << dirent.path().string() << '\n';
			fs::remove(path);
		}
	}
}
