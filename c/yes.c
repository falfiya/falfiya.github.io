#define __USE_MISC

#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

#include <stddef.h>

void *buf_start;
char *buf;

void *thread(void *_) {
   sleep(1);
   write(1, buf_start, __SIZE_MAX__);
   return NULL;
}

#define MSG "no "
#define MSG_LEN 3


int main() {
   pthread_t t_id;
   pthread_create(&t_id, NULL, thread, NULL);
   while (1) {
      void *temp_new_buf = buf_start + MSG_LEN;
      if (brk(temp_new_buf) == 0) {
         buf[0] = 'n';
         buf[1] = 'o';
         buf[2] = ' ';
      } else {
         pthread_cancel(t_id);
         return 1;
      }
   }
   return 0;
}
