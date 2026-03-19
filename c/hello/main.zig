extern "kernel32" fn GetStdHandle(nStdHandle: u32) *anyopaque;
extern "kernel32" fn WriteConsoleA(
    hConsoleOutput: *anyopaque,
    lpBuffer: [*]const u8,
    nNumberOfCharsToWrite: u32,
    lpNumberOfCharsWritten: *u32,
    lpReserved: ?*anyopaque,
) i32;
extern "kernel32" fn ExitProcess(uExitCode: u32) noreturn;

const STD_OUTPUT_HANDLE = @as(u32, @bitCast(@as(i32, -11)));

export fn start() noreturn {
    const handleToStdout = GetStdHandle(STD_OUTPUT_HANDLE);

    const greeting = "Hello, World!";
    var charsWritten: u32 = 0;
    _ = WriteConsoleA(
        handleToStdout,
        greeting,
        @intCast(greeting.len),
        &charsWritten,
        null,
    );

    ExitProcess(0);
}