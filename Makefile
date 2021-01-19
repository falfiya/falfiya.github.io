C_FLAGS := -Wall
CXX_FLAGS := \
	-Wall \
	-std=c++20 \
	-IP:/lib/llvm/include/fast_io

cxx/%.exe: cxx/%.cxx
	-clang++ $(CXX_FLAGS) $< -o $@

run~%.cxx: cxx/%.exe
	@-$<

c/%.exe: c/%.c
	-clang $(C_FLAGS) $< -o $@

run~%.c: c/%.exe
	@-$<

clean-cxx:

.SECONDARY:
