from tkinter import *
from random import randrange, choice

root = Tk()

root.title("choas game")

d = 600, 500

def rand_point():
   return randrange(0, d[0]), randrange(0, d[1])

w = Canvas(root, width=d[0], height=d[1], bg="black")
w.pack()

def draw_pixel(at):
   x, y = at
   w.create_line(x, y, x + 1, y, fill="white")

anchors = [rand_point() for _ in [None]*3]

for anchor in anchors:
   draw_pixel(anchor)

rand_anchor = lambda: choice(anchors)

current = [anchors[0][0], anchors[0][1]]

def frame():
   target = rand_anchor()

   current[0] += target[0]
   current[1] += target[1]

   current[0] //= 2
   current[1] //= 2

   draw_pixel(current)

   root.after(10, frame)
frame()

root.mainloop()
