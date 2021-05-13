import os

class OS:
   if os.name == "nt":
      print("OS is Windows")
      os = "Windows"
   else:
      print("OS is not Windows")
      os = "Not Windows"

print("OS class was made")
print(f"{OS() = }~")
