def debrujin(a,n):
  b=len(a)
  s=a[0]*n
  A=0
  while len(s)<b**n-1+n:
    B=a[A]
    if s.find(s[1-n:]+B)+1:
      A+=1
      if A >= b:
        A=a.find(s[-1:])+1
        s=s[:-1]
    else:
      s+=B
      A=0
  return s
