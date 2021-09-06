actor Main
   fun mantra(env: Env) =>
      env.out.print("There's one thing every programmer must understand:")
      env.out.print("The env.out.print command.")
   new create(env: Env) =>
      mantra(env)
      env.out.write("\n")
      mantra(env)
