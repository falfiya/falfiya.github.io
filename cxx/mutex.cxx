// CSE 113 Mutex From Memory
#include <atomic>
#include <thread>
using namespace std;

class mutex {
   atomic_bool locked{false};
public:
   void lock() {
peek:
      while (atomic_fetch_xor(&locked, false) == true) {
         this_thread::yield();
      }
      bool already_locked = atomic_fetch_or(&locked, true);
      if (already_locked) {
         goto peek;
      }
   }

   bool try_lock() {
      return atomic_fetch_or(&locked, true);
   }

   void unlock() {
      bool already_unlocked = atomic_fetch_xor(&locked, true);
      if (already_unlocked) {
         __builtin_trap();
      }
   }
};
