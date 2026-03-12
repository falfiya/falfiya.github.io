# d/dλ

# Haskell Case Syntax lol
proc case {data cases} {
   set label [lindex $data 0]
   set args [lrange $data 1 end]

   set i 0
   while {$i < [llength $cases]} {
      set arm [lindex $cases $i]

      # catchall pattern
      if {$arm == "_"} {
         # _ -> code
         uplevel 1 "set _ {$data}; [lindex $cases [expr $i + 2]]"
         return
      }

      # list pattern
      set elems [split $arm :]
      if {[llength $elems] > 1} {
         set i [expr $i + 1]
         if {[lindex $cases [expr $i]] == "->"} {
            set i [expr $i + 1]
         } else {
            error "List pattern must be followed by ->".
         }

         set data_i 0
         set prog ""
         # Matched list pattern arm such as x:xs ->
         set last_elem_idx [expr [llength $elems] - 2]
         foreach param [lrange $elems 0 $last_elem_idx] {
            set arg_value [lindex $data $data_i]
            set prog "$prog; set $param {$arg_value}"
            set data_i [expr $data_i + 1]
         }
         set naming_is_hard [expr $last_elem_idx + 1]
         set param_rest [lindex $elems $naming_is_hard]
         set args_rest [lrange $data $naming_is_hard end]
         # This is the xs part of the list
         set prog "$prog; set $param_rest [list $args_rest]"
         set arm_code [lindex $cases $i]
         set prog "$prog; $arm_code"
         uplevel 1 $prog
         return
      }

      lappend arms $arm

      if {$arm == $label} {
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
            set prog "$prog; set $param {$arg_value}"
            set arg_i [expr $arg_i + 1]
         }
         set i [expr $i + 1]
         set arm_code [lindex $cases $i]
         set prog "$prog; $arm_code"
         uplevel 1 $prog
         return
      }

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

   error "No case found for $label. Expecting one of $arms."
}

# data Token
   # Lambda
   # Arrow
   # ParenL
   # ParenR
   # Var (v : str)
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

set t [tokenize $input]
puts "tokenize:   $t"

# data Expr1
   # Var (x : str)
   # Lambda (param : str) (body : Expr1)
   # App (e1 e2 : Expr1)
   # Id
# parse :: [Token] -> Expr1
proc __parse1 {tokens} {
   upvar 1 i i

   # Root node
   set root {Id}
   set break false
   while {$i < [llength $tokens] && !$break} {
      set token [lindex $tokens $i]
      case $token {
         Lambda -> {
            set i [expr $i + 1]
            set token [lindex $tokens $i]
            case $token {
               Var x -> {set param $x}
               _ -> {error "Expecting parameter after Lambda!"}
            }

            set i [expr $i + 1]
            set token [lindex $tokens $i]
            case $token {
               Arrow -> {set i [expr $i + 1]}
               _ -> {error "Expecting arrow after Lambda parameter!"}
            }

            set body [__parse1 $tokens]
            set root [list App $root [list Lambda $param $body]]
         }
         ParenL -> {
            set i [expr $i + 1]
            set subexpr [__parse1 $tokens]
            set token [lindex $tokens $i]
            if {$token == "ParenR"} {
               set i [expr $i + 1]
            } else {
               error "Expecting closing paren"
            }
            set root [list App $root $subexpr]
         }
         ParenR -> {
            # do not move past
            # set i [expr $i + 1]
            set break true
         }
         Var x -> {
            set i [expr $i + 1]
            set root [list App $root [list Var $x]]
         }
         _ -> {error "Unexpected token $_"}
      }
   }

   return $root
}
proc parse1 {tokens} {
   set i 0
   return [__parse1 $tokens]
}

# data Expr2
   # Var (n : Nat)
   # Free (x : str)
   # Lambda (body : Expr2)
   # App (e1 e2 : Expr2)
proc __parse2 {expr1 varlevels} {
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
            return [__parse2 $e2 $varlevels]
         }

         return [list App [__parse2 $e1 $varlevels] [__parse2 $e2 $varlevels]]
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
   upvar 1 out_stack out_stack

   case $ins {
      {} -> {
         set ok true
         set out_stack $stack
         set out_ins $ins
      }
      x:xs -> {
         case $x {
            PUSH x -> {
               set new_stack "[list $x] $stack"
               set diag [format %-50s "   PUSH [list $x]"]
               puts "$diag stack: $new_stack"
               return [__vm-eval $xs $new_stack]
            }
            LOAD n -> {
               set val [lindex $stack $n]
               set new_stack "[list $val] $stack"
               set diag [format %-50s "   LOAD $n = $val"]
               puts "$diag stack: $new_stack"
               return [__vm-eval $xs $new_stack]
            }
            CALL -> {
               puts "   CALL"
               case $stack {
                  {} -> {error "Cannot CALL with empty stack!"}
                  function:stack -> {
                     case $function {
                        Lambda body -> {
                           set lambda_inst [compile $body]
                           set new_instrs [concat $lambda_inst $xs]
                           return [__vm-eval $new_instrs $stack]
                        }
                        _ -> {
                           # Trying to call something that's not a function!
                           # Could be a free var.
                           # Let's decompile and leave the answer as-is
                           set ok false
                           set out_stack $stack
                           set out_ins $ins
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
   set ok false
   set out_stack ""
   set out_ins ""

   puts "eval:"
   __vm-eval $ins {}

   if $ok {
      return [list $out_ins $out_stack]
   } else {
      error "TODO"
   }
}

# decompile :: [Instr] -> Expr2
proc decompile {instr stack} {
   
}

proc run {elsie} {
   set t [tokenize $input]
   puts "tokenize:   $t"

   set p1 [parse1 $t]
   puts "parse1:     $p1"

   set p2 [parse2 $p1]
   puts "parse2:     $p2"

   set i [compile $p2]
   puts "compiled:   $i"

   set e [vm-eval $i]
   puts "-- ----"
   puts "IS $e"
}

run "&x.x"
