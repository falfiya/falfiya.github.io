from tkinter import*
from random import*
r=Tk()
r.title("choas game")
W=600
H=500
g=randrange
P=lambda:(g(0,W),g(0,H))
w=Canvas(r,width=W,height=H,bg="black")
w.pack()
def D(q):x,y=q;w.create_line(x,y,x+1,y,fill="white")
A=[P(),P(),P()]
for x in A:D(x)
c=[*A[0]]
def f():T=choice(A);c[0]+=T[0];c[1]+=T[1];c[0]//=2;c[1]//=2;D(c);r.after(7,f)
f()
r.mainloop()
