n = None
e = int | None

# covers slots 0
layer0: list[e] = [
   3,
   n,
   6,
   n,
   10,
   n,
   7,
   n,
   15,
   n,
   8,
   n,
]

# covers slots 0, 1
layer1: list[tuple[e, e]] = [
   (6, 12),
   (17, n),
   (7, 4),
   (3, n),
   (n, 7),
   (6, 15),
   (n, n),
   (11, n),
   (11, 14),
   (6, n),
   (11, 9),
   (n, n),
]

# covers slots 0, 1, 2
layer2: list[tuple[e, e, e]] = [
   (8, n, n),
   (9, 21, 5),
   (13, 6, n),
   (9, 15, 10),
   (7, 4, n),
   (13, 9, 8),
   (21, 18, n),
   (17, 11, 22),
   (4, 26, n),
   (5, 14, 16),
   (n, 1, n),
   (7, 12, 9),
]

# covers slots 0, 1, 2, 3
layer3: list[tuple[e, e, e, e]] = [
   (9, 12, 6, 9),
   (n, 3, n, n),
   (7, 6, 2, 12),
   (14, n, 13, n),
   (11, 14, 9, 6),
   (n, 12, n, n),
   (8, 3, 17, 10),
   (n, 8, 19, n),
   (16, 9, 3, 10),
   (2, n, 12, n),
   (7, 9, 3, 1),
   (n, 20, 26, n),
]

layerb: list[tuple[int, int, int, int]] = [
   (11, 14, 9, 7),
   (14, 15, 9, 8),
   (11, 4, 4, 8),
   (11, 5, 4, 3),
   (14, 6, 6, 4),
   (11, 7, 6, 12),
   (14, 8, 3, 2),
   (11, 9, 3, 5),
   (14, 10, 14, 10),
   (14, 11, 14, 7),
   (11, 12, 21, 16),
   (14, 13, 21, 8),
]

def try_permute(l0: int, l1: int, l2: int, l3: int) -> bool:
   # make answer list
   answer: list[list[int]] = [None] * 12
   for i in range(12):
      base = layerb[i]
      answer[i] = [*base]

   # covers slots 0, 1, 2, 3
   for i in range(12):
      p = (i + l3) % 12
      circle_col = layer3[p]
      answer_col = answer[i]
      # assign answers based on the ring
      if circle_col[0] is not None:
         answer_col[0] = circle_col[0]
      if circle_col[1] is not None:
         answer_col[1] = circle_col[1]
      if circle_col[2] is not None:
         answer_col[2] = circle_col[2]
      if circle_col[3] is not None:
         answer_col[3] = circle_col[3]

   # covers slots 0, 1, 2
   for i in range(12):
      p = (i + l2) % 12
      circle_col = layer2[p]
      answer_col = answer[i]
      # assign answers based on the ring
      if circle_col[0] is not None:
         answer_col[0] = circle_col[0]
      if circle_col[1] is not None:
         answer_col[1] = circle_col[1]
      if circle_col[2] is not None:
         answer_col[2] = circle_col[2]

   # covers slots 0, 1
   for i in range(12):
      p = (i + l1) % 12
      circle_col = layer1[p]
      answer_col = answer[i]
      # assign answers based on the ring
      if circle_col[0] is not None:
         answer_col[0] = circle_col[0]
      if circle_col[1] is not None:
         answer_col[1] = circle_col[1]

   # covers slots 0
   for i in range(12):
      p = (i + l0) % 12
      circle_ring = layer0[p]
      answer_col = answer[i]
      # assign answers based on the ring
      if circle_ring is not None:
         answer_col[0] = circle_ring

   for col in answer:
      if sum(col) != 42:
         return False

   print()
   print(answer)
   return True

for l0 in range(12):
   for l1 in range(12):
      for l2 in range(12):
         for l3 in range(12):
            if try_permute(l0, l1, l2, l3):
               print("base:", layerb[0])
               print("3rd:", layer3[l3])
               print("2nd:", layer2[l2])
               print("1st:", layer1[l1])
               print("0th:", layer0[l0])
               exit()
