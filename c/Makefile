default:
	$(error You need to select a target)

dev_powershell: powershell_stub.c
	clang powershell_stub.c -o dev_powershell.exe
	./dev_powershell.exe

powershell.exe: powershell_stub.c
	clang powershell_stub.c -O2 -o powershell.exe
	move powershell.exe "/Program Files/PowerShell/6/powershell.exe"
