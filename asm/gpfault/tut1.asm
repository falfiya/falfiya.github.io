; shows bits of a value in right-to-left order
macro showbits_rtl arg {
   val = arg
   while val > 0
      display (val and 1) + '0'
      val = val shr 1
   end while
}
showbits_rtl 13
