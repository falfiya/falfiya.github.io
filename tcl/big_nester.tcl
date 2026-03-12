proc big_nester {n} {
   # Let's even put it in a loop that will never finish!
   while {$n > 20} {
      big_nester [expr $n - 1]
   }

   if {$n > 0} {
      set rec_val [big_nester [expr $n - 1]]
      puts "Recursively fetched $rec_val"
      return [expr $rec_val + 1]
   } else {
      # We would expect this function to return n
      big_return 0
   }
}

proc big_return {v} {
   set level [info level]
   set i $level
   while True {
      set frame [info frame $i]
      if {[dict exists $frame proc] && [dict get $frame proc] == "::big_nester"} {
         set i [expr $i - 1]
      } else {
         break
      }
   }

   puts "Currently at level: $level"
   puts "Desired level: $i"

   set delta [expr $level - $i + 1]
   puts "return -level $delta"
   return -level $delta $v
}

proc caller_of_big_nester {} {
   puts "Big Nester Return Value: [big_nester 30]"
}

caller_of_big_nester
