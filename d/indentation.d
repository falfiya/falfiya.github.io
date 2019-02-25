import std.stdio;
void main() {
  writeln("What's your favorite number?");
  int favorite_number;
  readf("%s", &favorite_number);
  if (favorite_number < 1) {
    writeln("No, your favorite number is not negative. Not allowed. Try again");
  } else {
    writeln(
      "Great! Since you like it so much, please use ",
      favorite_number,
      " spac",
      favorite_number > 1 ? "es" : "e",
      " per indentation level!"
    );
  }
}
