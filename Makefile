cxx/%.exe: cxx/%.cxx
	-clang++ -std=c++17 -Wall $< -o $@

run~%.cxx: cxx/%.exe
	@-$<

cxx/%.debug.exe: cxx/%.cxx
	-clang++ -std=c++17 -Wall -g $< -o $@

debug~%.cxx: cxx/%.debug.exe
	

debug-run~%.cxx: cxx/%.debug.exe
	@-$<

c/%.exe: c/%.c
	-clang -Wall $< -o $@

run~%.c: c/%.exe
	@-$<

.SECONDARY:
