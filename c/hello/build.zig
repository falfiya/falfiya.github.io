const std = @import("std");

pub fn build(b: *std.Build) void {
    const exe = b.addExecutable(.{
        .name = "main_zig",
        .root_source_file = .{ .path = "main.zig" },
        .optimize = .ReleaseSmall,
        .target = b.standardTargetOptions(.{}),
    });

    exe.entry = .{ .symbol = "start" };
    b.installArtifact(exe);
}