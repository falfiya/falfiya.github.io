cflags += -Oz
cflags += -nostdlib
cflags += -ffreestanding
cflags += -lkernel32
cflags += -Xlinker /entry:start
cflags += -Xlinker /nodefaultlib
cflags += -Xlinker /subsystem:console

main.exe: main.c
	clang $< $(cflags) -o $@

main.asm: main.c
	clang $< $(cflags) -S -masm=intel -o $@
