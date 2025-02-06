package gogh

type z interface{int}

var x interface{}
var y interface{} = x

func foo[Z z](q Z) int {
   return int(q)
}
