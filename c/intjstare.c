int j = 'stare';
char s = 's';

int main() {
   char const *restrict c = &s;
   do {
      putchar(*c);
   } while (c-- != &j);
}
