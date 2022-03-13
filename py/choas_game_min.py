from tkinter import*
from random import*
def D(q):x,y=q;w.create_line(x,y,x+1,y,fill="white")
def f():T=choice(A);c[0]+=T[0];c[1]+=T[1];c[0]//=2;c[1]//=2;D(c);r.after(5,f)
r,W,H,g,P=Tk(),600,500,randrange,lambda:(g(0,W),g(0,H));r.title("choas game");w,A=Canvas(r,width=W,height=H,bg="black"),[P(),P(),P()];w.pack();c=[*A[0]];f();[*map(D,A)];r.mainloop()
