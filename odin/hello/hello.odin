package hello_world

import w "core:sys/windows"

hello :: "Hello, World!"

main :: proc() {
   chello: cstring = hello
   w.WriteConsoleW(w.GetStdHandle(w.STD_OUTPUT_HANDLE), rawptr(chello), len(hello), nil, nil)
}
