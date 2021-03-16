#include <string>
#include <iostream>
using namespace std;

struct Suffering {
   string why = "life";
   void say_why() { cout << this->why; }
};

int main() {
   Suffering contest;
   // why can you call methods like this
   contest.Suffering::say_why();
}
