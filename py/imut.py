import operator as op

class imut:
   def __init__(self, val):
      def get_val():
         return val
      self.val = get_val
      # operator overloads
      self.__lt__ = lambda o: op.lt(val, o)
      self.__le__ = lambda o: op.le(val, o)
      self.__eq__ = lambda o: op.eq(val, o)
      self.__ne__ = lambda o: op.eq(val, o)
      self.__ge__ = lambda o: op.ge(val, o)
      self.__gt__ = lambda o: op.gt(val, o)

      self.__or__ = lambda o: op.or_(val, o)

      self.__not__ = lambda o: op.not_(val, o)
      self.__abs__ = lambda o: op.abs (val, o)
      self.__add__ = lambda o: op.and_(val, o)
      self.__mod__ = lambda o: op.mod (val, o)
      self.__mul__ = lambda o: op.mul (val, o)
      self.__sub__ = lambda o: op.sub (val, o)
      self.__xor__ = lambda o: op.xor (val, o)

      self.__matmul__ = lambda o: op.matmul  (val, o)
      self.__truediv__ = lambda o: op.truediv (val, o)
      self.__floordiv__ = lambda o: op.floordiv(val, o)

      self.__neg__ = lambda: op.neg(val)
      self.__pos__ = lambda: op.pos(val)
      self.__pow__ = lambda: op.pow(val)

      self.__index__ = lambda: op.index(val)
      self.__invert__ = lambda: op.invert(val)

      self.__lshift__ = lambda o: op.lshift(val, o)
      self.__rshift__ = lambda o: op.rshift(val, o)

      # other stuff
      self.__str__ = lambda: str(val)
      self.__repr__ = lambda: repr(val)

      self.__bool__ = lambda: bool(val)
      self.__hash__ = lambda: hash(val)

      self.__bytes__ = lambda: bytes(val)
      self.__format__ = lambda: format(val)

      def getattr_(name: str):
         return getattr(val, name)
      self.__getattr__ = getattr_
      def setattr_(name: str, value: Any):
         setattr(val, name, value)
      self.__setattr__ = setattr_
      def delattr_(val, name):
         delattr(val, name)
      self.__delattr__ = delattr_
      self.__dir__ = lambda: dir(val)
