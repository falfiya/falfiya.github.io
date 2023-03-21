module Likes where
x!y=x++y
likes x=(l x)!" like"!(s x)!" this"
n=" and "
l[]="no one"
l[a]=a
l[a,b]=a!n!b
l(a:b:c)=a!", "!b!n!z c
s(a:b:_)=""
s _="s"
z[a]=a
z c=(show.length)c!" others"
