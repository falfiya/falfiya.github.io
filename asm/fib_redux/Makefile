n := fib_redux
mode := release

build: $n.elf
	-

run: $n.elf
	./$<

$n.elf: $n.o
	ld.lld -m elf_x86_64 $< -o $@
ifeq ($(mode), release)
	strip $@
endif

$n.o: $n.nasm Makefile
ifeq ($(mode), debug)
	nasm $< -f elf64 -gdwarf -o $@
endif
ifeq ($(mode), release)
	nasm $< -f elf64 -o $@
endif
