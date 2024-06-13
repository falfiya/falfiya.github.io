class Solution(object):
   def minOperations(self, boxes):
      """
      :type boxes: str
      :rtype: List[int]
      """
      boxes = [int(x) for x in boxes]
      bl = len(boxes)
      if bl == 0:
         return []
      if bl == 1:
         return [0]
      i = 0
      out = [0] * bl
      # left to right
      carry = boxes[i]
      cumulative = 0
      for i in range(1, bl):
         curr = boxes[i]
         cumulative += carry
         out[i] += cumulative
         if curr:
            carry += 1
      # right to left
      carry = boxes[bl - 1]
      cumulative = 0
      for i in range(bl - 2, -1, -1):
         curr = boxes[i]
         cumulative += carry
         out[i] += cumulative
         if curr:
            carry += 1
      return out
