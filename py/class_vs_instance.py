from box import Box

class Clazz:
   name     = "Clazz"
   str_attr = "str_attr initial"
   box_attr = Box("box_attr initial")
   lst_attr = []

   def __init__(self, name: str):
      self.name = name # does not overwrite Clazz.name!
      self.box_attr << name
      self.lst_attr.append(name)

   def str(self):
      return (self.name + ":\n"
      + f"   {self.str_attr = }\n"
      + f"   {self.box_attr = }\n"
      + f"   {self.lst_attr = }\n"
      )

print(f"""\
Clazz:
   {Clazz.str_attr = }
   {Clazz.box_attr = }
   {Clazz.lst_attr = }
""")

clazz1 = Clazz("clazz1")
print(clazz1.str())

Clazz.str_attr = "str_attr new"
print(f"""\
Clazz:
   {Clazz.str_attr = }
   {Clazz.box_attr = }
   {Clazz.lst_attr = }
""")

print(clazz1.str(), end = "")
