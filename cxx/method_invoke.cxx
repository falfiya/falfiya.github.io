#include <iostream>
using namespace std;
using str = char const *;

struct Alpha {
   str name;
   constexpr explicit Alpha(str name): name{name} {};
   void say_name() const noexcept { cout << "Alpha " << this->name << '\n'; }
};

struct Beta: public Alpha {
   using Alpha::Alpha;
   void say_name() const noexcept { cout << "Beta " << this->name << '\n'; };
};

int main() {
   Beta my_name{"coalpha"};
   // discovered while explaining virtual functions to marcus
   // very cursed but sometimes useful like this
   my_name.Alpha::say_name();
   my_name.Beta::say_name();
   my_name.say_name();
}
