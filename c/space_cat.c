#include <stdint.h>
#include <stdio.h>
#include <malloc.h>

#include <sys/stat.h>
#include <sys/types.h>

inline size_t file_size(FILE *f) {
	struct stat stats;
	fstat(_fileno(f), &stats);
	return stats.st_size;
}

int main(int argc, char *argv[]) {
	if (argc != 2) {
		fprintf(stderr, "%s compile_flags.txt\n", argv[0]);
		return 1;
	}

	argv++;

	FILE *txt;
	errno_t err = fopen_s(&txt, argv[0], "r");
	if (err) {
		fprintf(stderr, "Unable to open %s\n", argv[0]);
		return err;
	}

	size_t size = file_size(txt);
	char *buf = (char *) malloc(size);

	if (buf == NULL) {
		fputs("Allocation failure!\n", stderr);
		return 1;
	}

	_fread_nolock(buf, sizeof(char), size, txt);

	for (size_t i = 0; i < size; ++i) {
		if (buf[i] == '\n') {
			buf[i] = ' ';
		}
	}

	size_t last = size - 1;
	if (buf[last] == '\n') {
		buf[last] = '\0';
	}

	_fwrite_nolock(buf, sizeof(char), size, stdout);
}
