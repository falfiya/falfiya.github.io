merge_sort(0, None: [4, 75667, 6, 7, 1, 2, 3, 8, 99, -1, 20, -1, 5])
   merge_sort(0, 6: [4, 75667, 6, 7, 1, 2])
      merge_sort(0, 3: [4, 75667, 6])
         merge_sort(0, 1: [4])
         CELL END
         merge_sort(1, 3: [75667, 6])
            merge_sort(1, 2: [75667])
            CELL END
            merge_sort(2, 3: [6])
            CELL END
            After subcalls:
            [75667]|[6]
            currently the list is:
            [4, 75667, 6, 7, 1, 2, 3, 8, 99, -1, 20, -1, 5]
            noop mode: lidx = 1, ridx = 2
            swap mode: lidx = 1, ridx = 2
            75667@1 > 6@2
         SWAP END
         After subcalls:
         [4]|[6, 75667]
         currently the list is:
         [4, 6, 75667, 7, 1, 2, 3, 8, 99, -1, 20, -1, 5]
         noop mode: lidx = 0, ridx = 1
            4@0 < 6@1
      SORTED END
      merge_sort(3, 6: [7, 1, 2])
         merge_sort(3, 4: [7])
         CELL END
         merge_sort(4, 6: [1, 2])
            merge_sort(4, 5: [1])
            CELL END
            merge_sort(5, 6: [2])
            CELL END
            After subcalls:
            [1]|[2]
            currently the list is:
            [4, 6, 75667, 7, 1, 2, 3, 8, 99, -1, 20, -1, 5]
            noop mode: lidx = 4, ridx = 5
               1@4 < 2@5
         SORTED END
         After subcalls:
         [7]|[1, 2]
         currently the list is:
         [4, 6, 75667, 7, 1, 2, 3, 8, 99, -1, 20, -1, 5]
         noop mode: lidx = 3, ridx = 4
         swap mode: lidx = 3, ridx = 4
         7@3 > 1@4
      SWAP END
      After subcalls:
      [4, 6, 75667]|[1, 2, 7]
      currently the list is:
      [4, 6, 75667, 1, 2, 7, 3, 8, 99, -1, 20, -1, 5]
      noop mode: lidx = 0, ridx = 3
      swap mode: lidx = 0, ridx = 3
      4@0 > 1@3
   SWAP END
   merge_sort(6, 13: [3, 8, 99, -1, 20, -1, 5])
      merge_sort(6, 9: [3, 8, 99])
         merge_sort(6, 7: [3])
         CELL END
         merge_sort(7, 9: [8, 99])
            merge_sort(7, 8: [8])
            CELL END
            merge_sort(8, 9: [99])
            CELL END
            After subcalls:
            [8]|[99]
            currently the list is:
            [1, 2, 4, 6, 75667, 7, 3, 8, 99, -1, 20, -1, 5]
            noop mode: lidx = 7, ridx = 8
               8@7 < 99@8
         SORTED END
         After subcalls:
         [3]|[8, 99]
         currently the list is:
         [1, 2, 4, 6, 75667, 7, 3, 8, 99, -1, 20, -1, 5]
         noop mode: lidx = 6, ridx = 7
            3@6 < 8@7
      SORTED END
      merge_sort(9, 13: [-1, 20, -1, 5])
         merge_sort(9, 11: [-1, 20])
            merge_sort(9, 10: [-1])
            CELL END
            merge_sort(10, 11: [20])
            CELL END
            After subcalls:
            [-1]|[20]
            currently the list is:
            [1, 2, 4, 6, 75667, 7, 3, 8, 99, -1, 20, -1, 5]
            noop mode: lidx = 9, ridx = 10
               -1@9 < 20@10
         SORTED END
         merge_sort(11, 13: [-1, 5])
            merge_sort(11, 12: [-1])
            CELL END
            merge_sort(12, 13: [5])
            CELL END
            After subcalls:
            [-1]|[5]
            currently the list is:
            [1, 2, 4, 6, 75667, 7, 3, 8, 99, -1, 20, -1, 5]
            noop mode: lidx = 11, ridx = 12
               -1@11 < 5@12
         SORTED END
         After subcalls:
         [-1, 20]|[-1, 5]
         currently the list is:
         [1, 2, 4, 6, 75667, 7, 3, 8, 99, -1, 20, -1, 5]
         noop mode: lidx = 9, ridx = 11
         swap mode: lidx = 9, ridx = 11
         -1@9 > -1@11
      SWAP END
      After subcalls:
      [3, 8, 99]|[-1, -1, 20, 5]
      currently the list is:
      [1, 2, 4, 6, 75667, 7, 3, 8, 99, -1, -1, 20, 5]
      noop mode: lidx = 6, ridx = 9
      swap mode: lidx = 6, ridx = 9
      3@6 > -1@9
   SWAP END
   After subcalls:
   [1, 2, 4, 6, 75667, 7]|[-1, -1, 3, 8, 99, 20, 5]
   currently the list is:
   [1, 2, 4, 6, 75667, 7, -1, -1, 3, 8, 99, 20, 5]
   noop mode: lidx = 0, ridx = 6
   swap mode: lidx = 0, ridx = 6
   1@0 > -1@6
SWAP END
