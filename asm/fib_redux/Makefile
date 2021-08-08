n := repeated_hello

libpath := $(shell winsdk.exe --kit:um --type:lib --arch:x64)

xlinker += /debug
xlinker += /nodefaultlib
xlinker += /libpath:"$(libpath)"
xlinker += /subsystem:console
xlinker += /entry:start

libs += kernel32.lib

build: $n.exe
	-

run: $n.exe
	./$<

$n.exe: $n.obj
	lld-link $(xlinker) /out:$@ $< kernel32.lib

$n.obj: $n.nasm Makefile
	nasm $< -f win64 -g -o $@
