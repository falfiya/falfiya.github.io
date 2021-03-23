#define _CRT_SECURE_NO_WARNINGS
#include <stdint.h>
#include <stdio.h>
#include <malloc.h>
#include <errno.h>

#include <sys/stat.h>
#include <sys/types.h>

#ifdef _WIN32
#define fileno _fileno
#endif

inline size_t file_size(FILE *f) {
	struct stat stats;
	fstat(fileno(f), &stats);
	return stats.st_size;
}

int main(int argc, char *argv[]) {
	if (argc != 2) {
		fprintf(stderr, "%s compile_flags.txt\n", argv[0]);
		return 1;
	}

	argv++;

	FILE *txt = fopen(argv[0], "r");
	if (txt == NULL) {
		fprintf(stderr, "Unable to open %s\n", argv[0]);
		return errno;
	}

	size_t size = file_size(txt);
	char *buf = (char *) malloc(size);

	if (buf == NULL) {
		fputs("Allocation failure!\n", stderr);
		return 1;
	}

	fread(buf, sizeof(char), size, txt);

	for (size_t i = 0; i < size; ++i) {
		if (buf[i] == '\n') {
			buf[i] = ' ';
		}
	}

	size_t last = size - 1;
	if (buf[last] == '\n') {
		buf[last] = '\0';
	}

	fwrite(buf, sizeof(char), size, stdout);
}
