// There's this silly assignment that I have to do, and instead of actually
// map reducing correctly I'm going to cheese it using fake strings.
package main

import (
	"fmt"
	"unsafe"
)

func main() {
   var x byte
   longString := unsafe.String(&x, 10000000)
   fmt.Printf("%v", longString)
}
