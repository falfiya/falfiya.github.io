from textwrap import wrap

hstr = input("> ").strip()
for pair in wrap(hstr, 2):
   try:
      print(end=bytes.fromhex(pair).decode("utf-8"))
   except:
      print(f"?? {pair}")
      break
