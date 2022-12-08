function print(val: unknown, string_assert: {(u: unknown): asserts u is string}) {
   string_assert(val);
   process.stdout.write(val);
}

function do_nothing(u: unknown): void {}

print(0xdeadbeef, do_nothing);
