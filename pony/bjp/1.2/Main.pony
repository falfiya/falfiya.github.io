actor Main
   new create(env: Env) =>
      SpikeyStrategy(3).writeTo(env.out)

