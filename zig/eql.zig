const std = @import("std");

const Node = union(enum) {
   const Sum = struct {
      left: *Node,
      right: *Node,
   };

   Empty,
   Sum: Sum,
   Number: i64,
};

test "1 == 1 + 1" {
   var one = Node{.Number=1};
   const two = Node{.Sum=.{.left=&one, .right=&one}};
   try std.testing.expect(std.meta.eql(one, two));
}
