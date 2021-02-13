# c
c_flags  := $(shell space_cat.exe c/compile_flags.txt)
c_dflags := -g
c_rflags := -O2

## base
c/%.exe: c/%.c
	-clang $(c_flags) $< -o $@

run~%.c: c/%.exe
	@-$<

## debug
c/%.debug.exe: c/%.c
	-clang $(c_flags) $(c_dflags) $< -o $@

debug~%.c: c/%.debug.exe
	-

## release
c/%.release.exe: c/%.c
	-clang $(c_flags) $(c_rflags) $< -o $@

release~%.c: c/%.release.exe
	-

# cxx
cxx_flags  := $(shell space_cat.exe cxx/compile_flags.txt)
cxx_dflags := -g
cxx_rflags := -O2

## base
cxx/%.exe: cxx/%.cxx
	-clang++ $(cxx_flags) $< -o $@

run~%.cxx: cxx/%.exe
	@-$<

## debug
cxx/%.debug.exe: cxx/%.cxx
	-clang++ $(cxx_flags) $(cxx_dflags) $< -o $@

debug~%.cxx: cxx/%.debug.exe
	-

## release
cxx/%.release.exe: cxx/%.cxx
	-clang++ $(cxx_flags) $(cxx_rflags) $< -o $@

release~%.cxx: cxx/%.release.exe
	-

clean-artifacts: run~clean_artifacts.cxx
	-

.SECONDARY:
