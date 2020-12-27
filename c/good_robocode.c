// How movies portray robots
#include <stdint.h>

typedef struct robot_counter {
   uint32_t uptime_ticks: 31;
   uint8_t  should_kill_humans: 1;
} robot_counter;

extern void tick(robot_counter);

void time_keeper() {
   robot_counter counter = {
      .uptime_ticks = 0,
      .should_kill_humans = 0,
   };

   uint32_t *fast_counter = (uint32_t *) &counter;
   while (1) {
      (*fast_counter)++;
      tick(counter);
   }
}
