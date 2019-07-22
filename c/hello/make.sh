#!/usr/bin/env bash

gcc ./hello.c -O0 -v -o hello 2> hello.comp
strace ./hello 1> hello.output 2> hello.strace 
vim -o hello.strace
