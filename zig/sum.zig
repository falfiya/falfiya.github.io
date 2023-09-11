const std = @import("std");
const expect = std.testing.expect;


const ComplexType = union(enum) {
   ok: u8,
   not_ok: void,
};

test "switch on tagged union" {
   const c = ComplexType{ .ok = 42 };

   switch (c) {
      ComplexType.ok => |value| try expect(value == 42),
      ComplexType.not_ok => unreachable,
   }

   const data: [32]u8 = {};

   std.mem.copy(u8, data, &c);
}


