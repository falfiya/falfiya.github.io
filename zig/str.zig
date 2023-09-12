const std = @import("std");

const str = struct {
   data: []const u8,

   fn substring(self: str, start: u64, end: u64) str {
      return str{.data=self.data[start..end]};
   }

   fn eql(a: str, b: str) bool {
      return std.mem.eql(u8, a.data, b.data);
   }
};

test "\"hello world\".substring(0, 5) == \"hello\"" {
   const greeting = str{.data="hello world"};
   try std.testing.expect(str.eql(greeting.substring(0, 5), str{.data="hello"}));
}
