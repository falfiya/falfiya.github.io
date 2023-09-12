const w = struct { usingnamespace @import("std").os.windows; };
const k32 = struct { usingnamespace w.kernel32; };

// this should remove the zero but it doesn't...
fn nz(comptime s: []const u8) *const [s.len - 1]u8 {
   return s[0..s.len - 1];
}

export fn start() void {
   const hStdout = k32.GetStdHandle(w.STD_OUTPUT_HANDLE);
   const greeting = comptime nz("Hello, World!");
   _ = k32.WriteFile(hStdout.?, greeting, greeting.len, null, null);
   k32.ExitProcess(0);
}
