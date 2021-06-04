# snake language

Before I understood the object model, I kinda hated python for no other reason
than "I don't know how it works so it sucks". Sure, there are legitimate reasons
to dislike this language. Package management, virtual envs, and Jupyter come to
mind. But it's about as dynamic in nature as JavaScript, maybe even a little
more, actually. It's not immune to curse, by any means. It just seems like most
people who use it don't really take time to cause curse. Don't worry, I'll do
enough to make up for everyone else.

Alright I've used it long enough to start having complaints. Here they are.

- `lambda`s are garbage. Why neuter them like this?? Why not use an arrow?
- Should be `list.map(fn)`, not `map(fn, list)`
   - if you don't wanna do that, at least do what julia does and add a `|>`,
   thankyouverymuch.
- pip is stupid, npm is way better.
- virtual environments are scary because I don't understand them. Instead of
trying to understand them, I intend to complain forever.
- What is this difference between calling `python -m modules` and `python script`?
It's super dumb! Let me have my relative fucking imports, guys.
- Type system is weird and cursed because what happens in mypy doesn't happen in
the real world.
