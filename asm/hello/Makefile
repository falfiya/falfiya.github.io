ld_args += -Wl,/entry:start,/subsystem:console,/nodefaultlib,/align:16

run: clean hello.exe
	./hello.exe

clean:
	del /f hello.exe hello.obj k32.lib

hello.exe: hello.obj k32.lib
	clang $^ -Oz $(ld_args) -o $@
	llvm-strip -s $@

hello.obj: hello.nasm
	nasm $< -fwin64 -o $@

k32.lib: k32.def
	lld-link /def:$< /machine:x64 /out:$@
