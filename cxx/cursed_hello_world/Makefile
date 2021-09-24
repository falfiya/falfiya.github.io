cxxflags += -nostdlib
cxxflags += -ffreestanding
cxxflags += -fno-exceptions
cxxflags += -fno-stack-check
cxxflags += -fno-stack-protector
cxxflags += -mno-stack-arg-probe

cxxflags += -fuse-ld=lld
cxxflags += -lkernel32
cxxflags += -Xlinker /entry:start
cxxflags += -Xlinker /nodefaultlib
cxxflags += -Xlinker /subsystem:console

%.exe: %.cxx
	clang++ $< $(cxxflags) -Oz -o $@

%.debug.exe: %.cxx
	clang++ $< $(cxxflags) -g -o $@

%.asm: %.cxx
	clang++ $< $(cxxflags) -S -masm=intel -o $@
