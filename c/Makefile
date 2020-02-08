default:
	$(error You need to select a target)

CC:=clang
CFLAGS:=-Wall

%.exe: %.c
	$(CC) $< $(CFLAGS) -o $@
%.run: %.exe
	./$<

args.exe: args.c

isatty.exe: isatty.c

isatty.run: isatty.exe

ps_stub.exe: ps_stub.c

ps_stub.run: ps_stub.exe

ps_stub.install: powershell_stub.c
	clang powershell_stub.c -O2 -o powershell.exe
	move powershell.exe "/Program Files/PowerShell/6/powershell.exe"

clean:
	node clean.js

.PHONY: default %.run ps_stub.install
