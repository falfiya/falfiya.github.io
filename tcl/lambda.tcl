# d/dλ

proc print_stack {} {
   puts "   [format %-2s @] [dict get [info frame 0] proc]"

   set level [info level]
   set i [expr $level]
   while {$i > 0} {
      set frame [info frame $i]
      if {[dict exists $frame proc]} {
         puts "   [format %-2s $i] [dict get $frame proc]"
      }
      set i [expr $i - 1]
   }
}

proc baz {} {
   puts "this is in baz"
   print_stack
   puts "this is in baz uplevel 1"
   uplevel 1 {print_stack}
}
proc bar {} {
   baz
   puts "this is in bar"
   print_stack
}
proc foo {} {
   bar
   puts "this is in foo"
   print_stack
}

foo
exit

proc block_r3turn {{v {}}} {
   set debug true
   set level [info level]
   # No matter what, we always return past the first one stack.

   if $debug {
      puts "block_r3turn"
      puts "   level=$level"

      puts "   @ [format %-2s $level] [dict get [info frame $level] proc]"
   }

   set i [expr $level - 1]
   while {$i > 0} {
      set frame [info frame $i]
      if {[dict exists $frame proc]} {
         set procname [dict get $frame proc]
         if {$procname == "::case"} {
            if $debug {
               puts "     [format %-2s $i] [dict get $frame proc]"
            }
         } else {
            if $debug {
               puts "   > [format %-2s $i] [dict get $frame proc]"
            }
            set desired $i
            break
         }
      }
      set i [expr $i - 1]
   }

   if $debug {
      # Print the rest for debugging
      while {$i > 1} {
         set i [expr $i - 1]
         set frame [info frame $i]
         if {[dict exists $frame proc]} {
            set procname [dict get $frame proc]
            puts "     [format %-2s $i] [dict get $frame proc]"
         }
      }
   }

   # add 1 because we're currently in block_r3turn
   # add 1 again because we want to return out of the containing function
   set delta [expr $level - $desired + 2]
   if $debug {
      puts "   delta=$delta"
      puts "   return -level $delta [list $v]"
   }
   return -level $delta $v
}


# level_adjust :: String -> String
proc level_adjust {code} {
   return [string map {return block_r3turn} $code]
}

# Haskell Case Syntax lol
proc case {data cases} {
   set debug false
   set awful_debug false

   set label [lindex $data 0]
   set args [lrange $data 1 end]

   if $debug {
      puts "case $data"
   }

   set i 0
   while {$i < [llength $cases]} {
      set arm [lindex $cases $i]

      if $debug {
         puts "   try $arm"
         incr arms_count
      }

      lappend arms $arm

      # _ -> code
      # catchall pattern
      if {$arm == "_"} {
         set i [expr $i + 1]
         if $debug {
            puts "      matched $arm"
         }

         if {[lindex $cases [expr $i]] == "->"} {
            set i [expr $i + 1]
         } else {
            error "Catchall must be followed by ->".
         }

         set arm_code [lindex $cases $i]
         set prog "set _ {$data}; [level_adjust $arm_code]"

         if $awful_debug {
            puts "\n<program>"
            puts $prog
            puts "</program>\n"
         }

         set res [uplevel 1 $prog]
         if $debug {
            puts "      bubbling return result $res"
         }
         return $res
      }

      # list pattern
      set elems [split $arm :]
      if {[llength $elems] > 1} {
         if $debug {
            puts "   list pattern [list $arm [llength $elems]]"
         }

         set i [expr $i + 1]
         if {[lindex $cases [expr $i]] == "->"} {
            set i [expr $i + 1]
         } else {
            error "List pattern must be followed by ->".
         }

         if {[llength $data] > 0} {
            if $debug {
               puts "      matched $arm"
            }
            set data_i 0
            set prog ""
            # Matched list pattern arm such as x:xs ->
            set last_elem_idx [expr [llength $elems] - 2]
            foreach param [lrange $elems 0 $last_elem_idx] {
               set arg_value [lindex $data $data_i]
               if $debug {
                  puts "      $param=$arg_value"
               }
               set prog "$prog; set $param {$arg_value}"
               set data_i [expr $data_i + 1]
            }
            set naming_is_hard [expr $last_elem_idx + 1]
            set param_rest [lindex $elems $naming_is_hard]
            set args_rest [lrange $data $naming_is_hard end]
            # This is the xs part of the list
            set prog "$prog; set $param_rest [list $args_rest]"
            set arm_code [lindex $cases $i]
            set prog "$prog; [level_adjust $arm_code]"
            if $awful_debug {
               puts "\n<program>"
               puts $prog
               puts "</program>\n"
            }
            set res [uplevel 1 $prog]
            if $debug {
               puts "      bubbling return result $res"
            }
            return $res
         } else {
            # Jump over the code block
            set i [expr $i + 1]
            continue
         }
      }

      if {$arm == $label} {
         if $debug {
            puts "      matched $arm"
         }
         set arg_i 0
         # We're in an arm.
         # Go through the parameter names and construct the program.
         set prog ""
         while true {
            set i [expr $i + 1]
            set param [lindex $cases $i]
            if {$param == "->"} {
               break
            }
            set arg_value [lindex $args $arg_i]
            if $debug {
               puts "      $param=$arg_value"
            }
            set prog "$prog; set $param {$arg_value}"
            set arg_i [expr $arg_i + 1]
         }
         set i [expr $i + 1]
         set arm_code [lindex $cases $i]
         set prog "$prog; [level_adjust $arm_code]"
         if $awful_debug {
            puts "\n<program>"
            puts $prog
            puts "</program>\n"
         }
         set res [uplevel 1 $prog]
         if $debug {
            puts "      bubbling return result $res"
         }
         return $res
      } else {
         # Otherwise step to the next arm.
         while {$i < [llength $cases]} {
            set i [expr $i + 1]
            set param [lindex $cases $i]
            if {$param == "->"} {
               # step past the arm code
               set i [expr $i + 2]
               break
            }
         }
      }
   }

   if $debug {
      puts "   #cases=$arms_count"
   }
   error "Expected one of [list $arms] but saw [list $label]"
}

# data Token
   # Lambda
   # Arrow
   # ParenL
   # ParenR
   # Var (v : String)
proc tokenize {s} {
   set chrs [split $s ""]

   set i 0
   while {$i < [llength $chrs]} {
      set w [lindex $chrs $i]
      set i [expr $i + 1]
      case $w {
         "" -> {}
         "\\" -> {lappend out Lambda}
         "&" -> {lappend out Lambda}
         "->" -> {lappend out Arrow}
         "." -> {lappend out Arrow}
         "(" -> {lappend out ParenL}
         ")" -> {lappend out ParenR}
         _ -> {
            # Go until we don't see a \W character
            set var $w
            set w [lindex $chrs $i]
            while [regexp {\w} $w] {
               set i [expr $i + 1]
               set var "$var$w"
            }
            lappend out [list Var $var]
         }
      }
   }

   return $out
}

# data Expr1
   # Var (x : str)
   # Lambda (param : str) (body : Expr1)
   # App (e1 e2 : Expr1)
   # Id
# parse :: [Token] -> Expr1
proc __parse1 {} {
   set debug true

   upvar 1 i i
   upvar 1 tokens tokens

   if $debug {
      puts "<__parse1>"
   }

   set root Id
   while {$i < [llength $tokens]} {
      set token [lindex $tokens $i]
      if $debug {
         puts "__parse1 loop"
         puts "   root=$root"
         puts "   tokens=[lrange $tokens $i end]"
      }

      case $token {
         Lambda -> {
            set i [expr $i + 1]

            set token [lindex $tokens $i]
            case $token {
               Var x -> {
                  set param $x
               }
               _ -> {error "Expecting parameter after Lambda!"}
            }
            set i [expr $i + 1]

            set token [lindex $tokens $i]
            case $token {
               Arrow -> {}
               _ -> {error "Expecting arrow after Lambda parameter!"}
            }
            set i [expr $i + 1]

            puts "   a@@@@@@@@@sddddddddddddddlambda body is"
            print_stack
            set body [__parse1]
            puts "hello hello>>??ASDo12349023490e"
            set root [list App $root [list Lambda $param $body]]
         }
         ParenL -> {
            set i [expr $i + 1]

            set subexpr [__parse1]

            # At this stage of the game, our sub-parser should have seen a ParenR
            set token [lindex $tokens $i]
            if {$token == "ParenR"} {
               set i [expr $i + 1]
               puts "@@@@@@@@@@@@"
            } else {
               error "Expecting closing paren"
            }
            set root [list App $root $subexpr]
         }
         ParenR -> {
            # do not move past
            # set i [expr $i + 1]
            if $debug {
               puts "   sub=$root"
               puts "</__parse1>"
            }
            return $root
         }
         Var x -> {
            set i [expr $i + 1]
            set root [list App $root [list Var $x]]
         }
         _ -> {error "Unexpected token $_"}
      }
   }

   if $debug {
      puts "</__parse1>"
   }
   return $root
}
proc parse1 {tokens} {
   set i 0
   return [__parse1]
}

# data Expr2
   # Var (n : Nat)
   # Free (x : str)
   # Lambda (body : Expr2)
   # App (e1 e2 : Expr2)
proc __parse2 {expr1 varlevels} {
   set debug true
   if $debug {
      puts "__parse2"
      puts "   expr1=$expr1"
      puts "   varlevels=$varlevels"
   }
   case $expr1 {
      Var x -> {
         if [dict exists $varlevels $x] {
            return [list Var [dict get $varlevels $x]]
         } else {
            return [list "Free" $x]
         }
      }
      Lambda param body -> {
         foreach k [dict keys $varlevels] {
            dict incr varlevels $k
         }
         dict set varlevels $param 0
         return [list Lambda [__parse2 $body $varlevels]]
      }
      App e1 e2 -> {
         if {$e1 == "Id"} {
            set x [__parse2 $e2 $varlevels]
            puts "   id was eliminated"
            puts "   so I got $x"
            return $x
         }

         set left [__parse2 $e1 $varlevels]
         set right [__parse2 $e2 $varlevels]
         puts "   App resulted in $left and $right"
         return [list App $left $right]
      }
   }
}
proc parse2 {expr1} {
   return [__parse2 $expr1 {}]
}

proc mkFreeVar {} {
   upvar 1 used_vars used_vars
}
proc __stringify2 {expr2} {
   upvar 1 used_vars used_vars
}
proc stringify2 {expr2} {
   set used_vars ""
}

# data Instr
   # PUSH (x : Expr2)
   # LOAD (n : Int)
   # CALL
   # DONE
proc compile {expr2} {
   case $expr2 {
      Free x -> {
         return [list [list PUSH [list Free $x]]]
      }
      Var n -> {
         return [list [list LOAD $n]]
      }
      Lambda b -> {
         return [list [list PUSH [list Lambda $b]]]
      }
      App f e -> {
         set f_instr [compile $f]
         set e_instr [compile $e]
         return [concat $e_instr $f_instr CALL]
      }
   }
}

proc __vm-eval {ins stack} {
   # puts "vm-eval ins<$ins> stack<$stack>"
   upvar 1 ok ok
   upvar 1 out_ins out_ins
   upvar 1 out_stack out_stack

   case $ins {
      {} -> {
         set ok true
         set out_ins $ins
         set out_stack $stack
      }
      x:xs -> {
         case $x {
            PUSH x -> {
               set new_stack [concat [list $x] $stack]
               set diag [format %-50s "   PUSH [list $x]"]
               puts "$diag stack: $new_stack"
               return [__vm-eval $xs $new_stack]
            }
            LOAD n -> {
               set val [lindex $stack $n]
               set new_stack [concat [list $val] $stack]
               set diag [format %-50s "   LOAD $n = $val"]
               puts "$diag stack: $new_stack"
               return [__vm-eval $xs $new_stack]
            }
            CALL -> {
               puts "   CALL"
               case $stack {
                  {} -> {error "Cannot CALL with empty stack!"}
                  function:stack2 -> {
                     case $function {
                        Lambda body -> {
                           set lambda_inst [compile $body]
                           set new_instrs [concat $lambda_inst $xs]
                           return [__vm-eval $new_instrs $stack2]
                        }
                        _ -> {
                           # Trying to call something that's not a function!
                           # Could be a free var.
                           # Let's decompile and leave the answer as-is
                           set ok false
                           set out_ins $ins
                           set out_stack $stack
                           return
                        }
                     }
                  }
               }
            }
         }
      }
   }
}

# vm-eval :: [Instr] -> (Instr, [Expr2])
# Interestingly, the stack is a list of Expr2.
# Somehow I didn't realize this while I was making it.
proc vm-eval {ins} {
   # My case constructs are a little funky so we just return using outparams.
   set ok false
   set out_stack ""
   # out instructions, to be clear
   set out_ins ""

   __vm-eval $ins {}

   return [list $out_ins $out_stack]
}

# decompile :: [Instr] -> Expr2
proc __decompile {instr stack {depth 0}} {
   upvar 1 out_stack out_stack

   case $instr {
      head:tail -> {
         case $head {
            PUSH e -> {tailcall __decompile $tail [concat [list $e] $stack] [expr $depth + 1]}
            CALL -> {
               case $stack {
                  function:arg:stack2 -> {
                     tailcall __decompile $tail [concat [list [list App $function $arg]] $stack] [expr $depth + 1]
                  }
                  _ -> {error "Expected two arguments on the stack for CALL"}
               }
            }
            _ -> {
               puts "$depth WTF: $_"
            }
         }
      }
      {} -> {
         puts "$depth no more instructions $instr"
      }
   }


   puts $stack
   set out_stack $stack
}
proc decompile {instr stack} {
   set out_stack ""
   __decompile $instr $stack
   return $out_stack
}

proc run {elsie} {
   puts "input:      $elsie"
   set t [tokenize $elsie]
   puts "tokenize:   $t"

   set p1 [parse1 $t]
   puts "parse1:     $p1"

   set p2 [parse2 $p1]
   puts "parse2:     $p2"

   set i [compile $p2]
   puts "compiled:   $i"

   puts "eval:"
   set e [vm-eval $i]
   puts "result: [lindex $e 0]"
   puts "stack: [lindex $e 1]"

   set d [decompile {*}$e]
   puts $d
   puts "dec: [lindex $d 0]"
   puts "stack: [lindex $d 1]"
}

run "(&x.x y) (&x.x y) z"


