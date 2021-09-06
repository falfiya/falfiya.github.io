class SpikeyStrategy
   let size: USize
   new create(size': USize) =>
      size = size'
   fun writeTo(stream: OutStream) =>
      let ary = Array[String](size)
      var i: USize = 1
      while i <= size do
         ary.push(""
            + " ".repeat_str(size - i)
            + "\\".repeat_str(i)
            + "/".repeat_str(i)
            + " ".repeat_str(size - i)
         )
         i = i + 1
      end
      for v in ary.values() do
         stream.print(v)
      end
      for v in ary.reverse().values() do
         stream.print(v.reverse())
      end
