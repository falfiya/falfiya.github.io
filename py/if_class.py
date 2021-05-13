import os

class OS:
   if os.name == "nt":
      print("OS is Windows")
      os = "Windows"
      def say_os(self):
         print("Windows")
   else:
      print("OS is not Windows")
      os = "Not Windows"
      def say_os(self):
         print("Not Windows")

print("OS class was made")

print(f"{OS().os = }")
print(f"{OS().say_os()}")
