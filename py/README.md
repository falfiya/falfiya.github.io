# snake language

Before I understood the object model, I kinda hated python for no other reason
than "I don't know how it works so it sucks". Sure, there are legitimate reasons
to dislike this language. Package management, virtual envs, and Jupyter come to
mind. But it's about as dynamic in nature as JavaScript, maybe even a little
more, actually. It's not immune to curse, by any means. It just seems like most
people who use it don't really take time to cause curse. Don't worry, I'll do
enough to make up for everyone else.

## grumblings

- `lambda`s are garbage. Why neuter them like this?? Why not use an arrow?
- Should be `list.map(fn)`, not `map(fn, list)`
   - if you don't wanna do that, at least do what julia does and add a `|>`,
   thankyouverymuch.
- pip is stupid, npm is way better.
- virtual environments are scary because I don't understand them. Instead of
trying to understand them, I intend to complain forever.
(it's on the list of things to do)
- What is this difference between calling `python -m modules` and `python script`?
It's super dumb! Let me have my relative imports, guys!
- Type system is weird and cursed because what happens in mypy doesn't happen in
the real world.
- Scope is weird and cursed.
- It's slow but who cares. Not me anymore.

## ok I really like it

- Language has probably got the most power out of the
three big dynamic languages.
- Feels *mostly* frictionless except for the aforementioned `map` business.
   - Sorta gets out of the way when you're trying to build things.
- One `None` type. No `undefined` and `null` nonsense.
- Object model makes a whole lotta sense, you know?
- Generally feels very well designed in the language department.
- Most things are not magic (except magic functions but those aren't magic either)
- Optional typing in standard library? You love to see it.
   - Lookin at you, JavaScript.
