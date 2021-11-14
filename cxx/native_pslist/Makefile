cxxflags += -nostdlib
cxxflags += -ffreestanding
cxxflags += -fno-exceptions
cxxflags += -fno-stack-check
cxxflags += -fno-stack-protector
cxxflags += -mno-stack-arg-probe

cxxflags += -fuse-ld=lld
cxxflags += -lntdll
cxxflags += -lkernel32
cxxflags += -Xlinker /entry:start
cxxflags += -Xlinker /nodefaultlib

run: native_pslist.exe
	./$<

native_pslist.exe: native_pslist.cxx windows.hxx
	clang++ $< $(cxxflags) -Oz -o $@
