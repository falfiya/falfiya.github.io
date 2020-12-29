CXX_FLAGS := \
	-Wall \
	-std=c++20 \
	-IP:/lib/llvm/include/fast_io

cxx/%.exe: cxx/%.cxx
	clang++ $(CXX_FLAGS) $< -o $@
# -fno-elide-constructors for testing catsail.cxx
run~%.cxx: cxx/%.exe
	# @echo ----- RUN $< -----
	@-$<
	# @echo ----- END $< -----

clean-cxx:

.SECONDARY:
