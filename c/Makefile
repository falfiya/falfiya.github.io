default:
	$(error You need to select a target)

install-ps_stub: ps_stub.c
	clang $< -O2 -o powershell.exe
	move powershell.exe "/Program Files/PowerShell/6/powershell.exe"

clean:
	node clean.js

.PHONY: default install-ps_stub clean
