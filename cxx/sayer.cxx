#include <iostream>

template <typename T, size_t count = 5>
class Sayer_c {
public:
   auto say(T what) {
      auto i(count);
      while (i --> 0) {
         std::cout << what << std::endl;
      }
   }
};

auto main() -> int {
   Sayer_c<std::string, 2> sayer1;
   sayer1.say("suffering");
   Sayer_c<int> sayer2;
   sayer2.say(2);
};
