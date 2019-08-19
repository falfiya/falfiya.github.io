const std = @import("std");

pub fn main() !void {
   const stdout_file = try std.io.getStdOut();
   try stdout_file.write("Hello, world!\n");
}

const assert = std.debug.assert;
test "true is true" {
   assert(false);
}
