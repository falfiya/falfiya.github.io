actor Main
   let out: OutStream
   fun slashes() =>
      out.print("//////////////////////")

   new create(env: Env) =>
      out = env.out
      slashes()
      out.print("|| Victory is mine! ||")
      slashes()
