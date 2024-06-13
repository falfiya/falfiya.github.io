from __future__ import annotations
from typing import *

T = TypeVar('T')

class LinkedList(Generic[T]):
   head: Optional[Node] = None
   tail: Optional[Node] = None
   length: int = 0

   class Node:
      val: Optional[T] = None
      next: Self = None

      def __init__(self, val: T):
         self.val = val

   def push_front(self, val: T):
      self.length += 1
      if self.head is None:
         self.head = self.Node(val)
         self.tail = self.head
      else:
         old_head = self.head
         self.head = self.Node(val)
         self.head.next = old_head

   def get_element_by_index(self, i):
      if (i > self.length):
         raise "OOB!"
      n = self.head
      for _ in range(i):
         n = n.next
      return n


   # rotate to front
   # if you have a list of
   # 1 2 3 4
   # and you rotate 3 to the front
   # 3 4 1 2
   # after that, if you rotate 2 to the front
   # 2 3 4 1
   # assume there are no duplicate elements
   # do nothing if you can't find the element
   def rotate_to_front(self, val: T):
      elements_rotated = 0
      while (self.head.val != val and elements_rotated < self.length):
         old_head = self.head
         new_head = self.head.next
         self.tail.next = old_head
         self.tail.next.next = None
         self.tail = self.tail.next
         self.head = new_head
         elements_rotated += 1
      return (elements_rotated != self.length)

   def rotate_to_front_falfia(self, val: T) -> bool:
      # Step 1) Find the Node
      if self.head.val == val:
         # edgecase 1: first element was correct element
         return True

      # prev.next is the node we haven't searched
      prev = self.head
      while prev.next is not None:
         if prev.next.val == val:
            break
         prev = prev.next
      else:
         # edgecase 2: couldn't find list element
         return False


      # Step 2) complete the circle
      self.tail.next = self.head

      # Step 3) cut the circle
      # at this point. prev.next is the element that matches val
      self.head = prev.next
      self.tail = prev
      prev.next = None

   def to_list(self) -> List[T]:
      out = []
      curr = self.head
      while curr is not None:
         out.append(curr.val)
         curr = curr.next
      return out

def to_linkedlist(l: List[T]) -> LinkedList[T]:
   out = LinkedList()
   for e in l[::-1]:
      out.push_front(e)
   return out

ll = to_linkedlist([1, 2, 3, 4])
ll.rotate_to_front(3)
print(ll.to_list())
