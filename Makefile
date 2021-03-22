ifeq ($(OS), Windows_NT)
	exe := exe
	cxx_flags += -fuse-ld=lld-link
else
	exe := elf
endif

space_cat.$(elf): c/space_cat.c
	clang $< -Wall -Wextra -Ofast -fuse-ld=lld -o $@

# c
c_flags  := $(shell space_cat.$(elf) c/compile_flags.txt)
c_dflags := -g
c_rflags := -O2

## base
c/%.$(elf): c/%.c
	-clang $< $(c_flags) -o $@

run~%.c: c/%.$(elf)
	@-$<

## debug
c/%.debug.$(elf): c/%.c
	-clang $< $(c_flags) $(c_dflags) -o $@

debug~%.c: c/%.debug.$(elf)
	-

## release
c/%.release.$(elf): c/%.c
	-clang $< $(c_flags) $(c_rflags) -o $@

release~%.c: c/%.release.$(elf)
	-

# cxx
cxx_flags  := $(shell space_cat.$(elf) cxx/compile_flags.txt)
cxx_dflags := -g
cxx_rflags := -O2

## base
cxx/%.$(elf): cxx/%.cxx
	-clang++ $< $(cxx_flags) -o $@

run~%.cxx: cxx/%.$(elf)
	@-$<

## debug
cxx/%.debug.$(elf): cxx/%.cxx
	-clang++ $< $(cxx_flags) $(cxx_dflags) -o $@

debug~%.cxx: cxx/%.debug.$(elf)
	-

## release
cxx/%.release.$(elf): cxx/%.cxx
	-clang++ $< $(cxx_flags) $(cxx_rflags) -o $@

release~%.cxx: cxx/%.release.$(elf)
	-

clean-artifacts: run~clean_artifacts.cxx
	-

.SECONDARY:
