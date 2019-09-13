#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>

bool is_not_allowed(char c);
bool is_delimiter(char c);
bool check(char *line);

bool is_not_allowed(char c) {
   return (
      c == ':'
      || c == '*'
      || c == '?'
      || c == '"'
      || c == '<'
      || c == '>'
      || c == '|'
      || c == '\r'
      || c == '\n'
   );
}

bool is_delimiter(char c) { return (c == '/' || c == '\\' ); }

bool check(char *line) {
   if (!isalpha(line[0]) || line[1] != ':') {
      return 0;
   }
   int i = 2;
   if (is_delimiter(line[i])) {
      while(1) {
         if(!line[++i]) {
            return 1;
         }
         if (is_not_allowed(line[i]) && !is_delimiter(line[i])) {
            return 0;
         }
      }
   }
   return 0;
}

int main(void) {
   char line_buffer_size = 255;
   char *line_buffer = malloc(line_buffer_size);
   char c;
   unsigned i = 0;
   while (true) {
      c = (char) getchar();
      while (c != '\n') {
         if (c == EOF) {
            goto end;
         }
         line_buffer[i++] = c;
         if (i >= line_buffer_size) {
            line_buffer_size *= 2;
            line_buffer = realloc(line_buffer, line_buffer_size);
         }
      }
      line_buffer[i] = 0;
      if (check(line_buffer)) {
         printf("%*s\n", i, line_buffer);
      }
      i = 0;
   }
   end:
   free(line_buffer);
}
