cflags += -Oz
cflags += -nobuiltininc
cflags += -nostdlib
cflags += -ffreestanding
cflags += -fuse-ld=lld
cflags += -Wl,/entry:start,/nodefaultlib,/subsystem:console

main.exe: main.c k32.lib
	clang $^ $(cflags) -o $@

k32.lib: k32.def
	lld-link /def:$< /machine:x64 /out:$@

main.asm: main.c
	clang $< $(cflags) -S -masm=intel -o $@
