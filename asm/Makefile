masm_path   := P:/lib/masm32

export PATH    := $(masm_path)/bin;$(PATH)
export INCLUDE := $(masm_path)/include

gc: garbage_collection.exe
	-

%.obj: %.asm
	ml /Zd /coff /c /Fo $@ $<

%.exe: %.obj
	link $< /align:16 /release /subsystem:console /libpath:$(masm_path)/lib /out:$@

run~%: %.exe
	$*.exe

.SECONDARY:
