from __future__ import annotations

class Logger:
   indent_size = 3

   indent = 0
   def __init__(self, msg, previous_logger: Logger = None):
      if previous_logger:
         self.indent = previous_logger.indent

      self(msg)

   def __enter__(self, *_) -> Logger:
      self.indent += self.indent_size
      return self

   def __exit__(self, *_):
      self.indent -= Logger.indent_size
      self("end")

   def __call__(self, msg: str):
      print(self.indent * ' ' + msg)
