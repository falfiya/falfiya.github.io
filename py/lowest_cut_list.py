def find_lowest(lst):
   if not lst:
      return None

   while True:
      mid = len(lst) // 2 - 1

      if len(lst) == 1:
         return lst[0]
      if lst[0] < lst[-1]:
         return lst[0]

      if lst[0] > lst[mid]:
         lst = lst[:mid + 1]
      else:
         lst = lst[mid + 1:]

the_max = 1000

sorted_list = [*range(0, the_max)]

for cut_point in range(0, the_max):
   cut_list = [*sorted_list[cut_point:], *sorted_list[:cut_point]]
   lowest = find_lowest(cut_list)
   if lowest != 0:
      print(cut_list)
