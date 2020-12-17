cxx/%.exe: cxx/%.cxx
	clang++ $< -Wall -std=c++17 -o $@
# -fno-elide-constructors for testing catsail.cxx
run~%.cxx: cxx/%.exe
	@echo ----- RUN $< -----
	@-$<
	@echo ----- END $< -----

.SECONDARY:
