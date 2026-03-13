set x abc
puts "A simple substitution: $x\n"

set y [set x "def"]
puts "Remember that set returns the new value of the variable: X: $x Y: $y\n"

set this-file [open "discussion-section.tcl" r]

set raw [read $this-file]

puts [llength [split $raw \n]]
