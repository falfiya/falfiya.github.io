cflags += -O0
cflags += --debugger-tune=lldb
cflags += --debugify-level=location+variables
cflags += --thread-model=single

lflags += /subsystem:windows
lflags += /entry:start
lflags += /nodefaultlib

exe: hello.exe
	-

asm: hello.asm
	-

hello.obj: hello.ll
	clang $< $(cflags) --filetype=obj -o $@

hello.exe: hello.obj
	llvm-link $< kernel32.lib $(lflags) /out:$@

hello.asm: hello.ll
	clang $< -S -masm=intel -o $@
