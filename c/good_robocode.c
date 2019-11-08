// How movies portray robots
#define true 1
#define false 0
struct robot_counter {
   unsigned long uptime_ticks: 31;
   unsigned should_kill_humans: 1;
} counter;
void time_keeper() {
   counter.uptime_ticks = 0;
   counter.should_kill_humans = false; // VERY IMPORTANT!!!
   unsigned long *fast_counter = (unsigned long *) &counter;
   while (true) {
      (*fast_counter)++;
      tick();
   }
}
