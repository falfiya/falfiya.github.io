dedupe = lambda l : list(set(l))

class base:
   class state_template:
      base = "base"

   def __init__(self):
      states = [
         c.state_template for c in type.mro(self.__class__) if c != object
      ]

      class state(*dedupe(states)):
         pass

      self.state = state()

class derived_alpha(base):
   class state_template:
      alpha = "alpha"

class derived_beta(derived_alpha):
   class state_template:
      beta = "beta"

class derived_gamma(derived_alpha):
   class state_template:
      gamma = "gamma"

class derived_delta(derived_beta, derived_gamma):
   pass

base = base()
delta = derived_delta()

print(delta.state.base)
print(delta.state.alpha)
print(delta.state.beta)
print(delta.state.gamma)
