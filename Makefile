cxx/%.exe: cxx/%.cxx
	clang++ $< -Wall -fno-elide-constructors -o $@

run~%.cxx: cxx/%.exe
	@echo ----- RUN $< -----
	@-$<
	@echo ----- END $< -----

.SECONDARY:
