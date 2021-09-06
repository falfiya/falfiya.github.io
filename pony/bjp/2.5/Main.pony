actor Main
   new create(env: Env) =>
      var i: U32 = 0
      var d: U32 = 1
      repeat
         i = i + d
         d = d + 2
         env.out.write(i.string() + " ")
      until i >= 100 end
