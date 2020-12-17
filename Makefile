cxx/%.exe: cxx/%.cxx
	clang++ $< -Wall -fno-elide-constructors -std=c++17 -o $@

run~%.cxx: cxx/%.exe
	@echo ----- RUN $< -----
	@-$<
	@echo ----- END $< -----

.SECONDARY:
