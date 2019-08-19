const std = @import("std");
const warn = std.debug.warn;
const allocator = std.heap.direct_allocator;
const os = std.os;


pub fn main() !u8 {
   const args = try std.process.argsAlloc(allocator);
   defer std.process.argsFree(allocator, args);
   for (args) |arg, i| {
      warn("{}: {}\n", i, arg);
   }
   return 1;
}
