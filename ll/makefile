# LINKER = lld
LINKER = link

ifeq ($(LINKER),lld)
else ($(LINKER),link)
else
	$(error LINKER must be either lld (llvm linker) or link (msvc linker)!)
endif

cflags += -Oz
cflags += -ffreestanding
ifeq ($(LINKER),lld)
	cflags += -flto
	cflags += -fuse-ld=lld
endif
cflags += -Wl,kernel32.lib,/nodefaultlib
ifeq ($(LINKER),link)
	cflags += -Wl,/align:16
endif

exe: hello.exe
	-
asm: hello.asm
	-

hello.exe: hello.ll
	clang $< $(cflags) -o $@
	llvm-strip -s $@

hello.asm: hello.ll
	clang $< -S -masm=intel -o $@

*: Makefile

.PHONY: exe asm
