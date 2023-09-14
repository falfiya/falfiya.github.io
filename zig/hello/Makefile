zflags += -target x86_64-windows-msvc
zflags += -O ReleaseSmall
zflags += -fPIC
zflags += -fno-PIE
zflags += -fno-error-tracing
zflags += -fno-stack-protector
zflags += -fno-unwind-tables

lflags += /align:16
lflags += /nodefaultlib
lflags += /subsystem:console
lflags += /entry:start

linker := "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat" && link

.PHONY: size
size: clean hello.exe
	@dir hello.exe
	./hello

.PHONY: clean
clean:
	del hello.exe hello.asm hello.obj hello.obj.o k32.lib
	cls

hello.exe: hello.obj k32.lib
	$(linker) $^ $(lflags) /out:$@
	llvm-strip -s $@

hello.asm: hello.zig
	zig build-obj $^ $(zflags) -femit-asm=$@

hello.obj: hello.zig
	zig build-obj $^ $(zflags) -femit-bin=$@

k32.lib: k32.def
	lld-link /def:$< /machine:x64 /out:$@
