#include <stdio.h>
int main(void)
{
   void exclaim(char const[const restrict *]);
   exclaim("Hello, World");
   asm("xor %eax, %eax");
   asm("call ExitProcess");
}

void exclaim(what)
char const what[const restrict];
{
   printf("%s!\n", what);
}
