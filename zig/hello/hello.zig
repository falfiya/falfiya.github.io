const w = struct {
   usingnamespace @import("std").os.windows;
};
const k32 = struct {
   usingnamespace w.kernel32;
};

// remove the sentinel value
fn nz(comptime s: []const u8) *const [s.len]u8 {
   return &@as([s.len]u8, s[0..s.len].*);
}

export fn start() void {
   const hStdout = k32.GetStdHandle(w.STD_OUTPUT_HANDLE);
   const greeting = nz("Hello, World!");
   _ = k32.WriteFile(hStdout.?, greeting, greeting.len, null, null);
   k32.ExitProcess(0);
}
