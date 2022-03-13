flags := -S -masm=intel -Os --std=c++17

callconv: callconv_llvm.s callconv_gnu.s
	-

callconv_llvm.s: callconv.cxx
	clang $(flags) $< -o $@

callconv_gnu.s: callconv.cxx
	gcc $(flags) $< -o $@
