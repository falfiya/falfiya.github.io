. := $(dir $(lastword $(MAKEFILE_LIST)))

ilasm  := Microsoft.NETCore.ILAsm
ildasm := Microsoft.NETCore.ILDasm

asm := $(firstword $(wildcard $..nuget/$(ilasm).*))/runtimes/native/ilasm.exe
dasm := $(firstword $(wildcard $..nuget/$(ildasm).*))/runtimes/native/ildasm.exe

$..nuget:
	mkdir $@

install: $..nuget
	nuget install $(ilasm) -OutputDirectory .nuget
	nuget install $(ildasm) -OutputDirectory .nuget
