import sys

def my_vars():
   return sys._getframe(1).f_locals

a = 1
b = 2

def main():
   c = 3
   print(my_vars())

main()
