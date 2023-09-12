// zig build-exe -O ReleaseSmall hello.zig
// not bad... 5kb.
// I can do better
pub fn main() void {
   _ = @import("std").io.getStdOut().write("Hello, Zig!") catch {
      unreachable;
   };
}
