cflags += -Oz
cflags += -nobuiltininc
cflags += -nostdlib
cflags += -ffreestanding
cflags += -fno-unwind-tables
cflags += -lkernel32
cflags += -ladvapi32
cflags += -Wl,/nodefaultlib,/subsystem:console
cflags += -Wl,/align:16

bench: milint.exe milint-cxx.exe
	$@

milint.exe: milint.c
	clang $^ $(cflags) -o $@
	llvm-strip -s $@

milint-cxx.exe: milint.cxx
	clang -Ofast $< -o $@
