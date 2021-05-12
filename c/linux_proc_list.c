#ifdef __linux__
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdint.h>
#include <dirent.h>
#include <unistd.h>
#include <limits.h> // PATH_MAX

// max PID could be 4194304.
// "/proc/".length + "4194304".length + "/exe".length
static char s_proc[17] = "/proc/";
static char *restrict s_proc6 = s_proc + 6;

int main() {
   DIR *const restrict proc = opendir(s_proc);
   if (!proc) {
      return 1;
   }

   struct dirent *restrict dirent;
   while ((dirent = readdir(proc))) {
      size_t i = 0;
      char c;
      while ((c = dirent->d_name[i])) {
         if (c < '0' ||'9' < c) {
            goto skip_current_dirent;
         }
         s_proc6[i] = c;
         i++;
      }

      s_proc6[i + 0] = '/';
      s_proc6[i + 1] = 'e';
      s_proc6[i + 2] = 'x';
      s_proc6[i + 3] = 'e';
      char exe_path[PATH_MAX];

      ssize_t len = readlink(s_proc, exe_path, PATH_MAX);
      if (len == -1) {
         printf("%s\n", dirent->d_name);
      } else {
         exe_path[len] = '\0';
         printf("%s -> %s\n", dirent->d_name, exe_path);
      }

      skip_current_dirent:;
   };

   closedir(proc);
}
#endif
