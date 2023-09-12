zflags += -target x86_64-windows-msvc
zflags += -O ReleaseSmall
zflags += -fPIC
zflags += -fno-PIE
# zflags += -flto
zflags += -fno-stack-protector

# lflags += /align:16
lflags += /nodefaultlib
lflags += /subsystem:console
lflags += /entry:start

hello.exe: hello.obj k32.lib
	lld-link $^ $(lflags) /out:$@
	llvm-strip -s $@

hello.obj: hello.zig
	zig build-obj $^ $(zflags) -femit-bin=$@

k32.lib: k32.def
	lld-link /def:$< /machine:x64 /out:$@
