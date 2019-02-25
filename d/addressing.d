import std.stdio: write, writeln;
void main() {
  // I've actually got no idea if this works but whatever
  if (uint.max == size_t.max) {
    write("32");
  } else {
    write("64");
  }
  writeln(" bit addressing!");
}
