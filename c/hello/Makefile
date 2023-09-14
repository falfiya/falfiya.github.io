# LINKER = lld
LINKER = link

ifneq ($(LINKER),lld)
ifneq ($(LINKER),link)
	$(error LINKER must be either lld (llvm linker) or link (msvc linker)!)
endif
endif

cflags += -Oz
cflags += -nobuiltininc
cflags += -nostdlib
cflags += -ffreestanding
cflags += -fno-unwind-tables
ifeq ($(LINKER),lld)
$(info LINKER = MSVC LINK.EXE)
cflags += -flto
cflags += -fuse-ld=lld
endif

cflags += -Wl,/nodefaultlib,/subsystem:console
ifeq ($(LINKER),link)
$(info LINKER = LLVM lld-link.exe)
cflags += -Wl,/align:16
endif

size: clean main.exe
	@-dir main.exe

clean:
	@-del main.exe k32.lib main.asm main.ll

main.exe: main.c k32.lib
	clang $^ $(cflags) -o $@
	llvm-strip -s $@

k32.lib: k32.def
	lld-link /def:$< /machine:x64 /out:$@

main.asm: main.c
	clang $< $(cflags) -S -masm=intel -o $@

main.ll: main.c
	clang $< $(cflags) -S -emit-llvm -o $@
