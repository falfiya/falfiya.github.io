/* Learnings:
[9:36 AM] coalpha: I see, using string_view::empty since that's constexpr
[9:40 AM] coalpha: interesting, so I can't have a constexpr const std::string
[9:40 AM] coalpha: if I could, then it would be okay for me to use std::string::empty
[9:41 AM] coalpha: because like string_view::empty that's also constexpr
[9:41 AM] coalpha: https://stackoverflow.com/a/43335753
[9:42 AM] coalpha: so the issue here is that an std::string can't be made
                   constexpr in C++17, which is what I'm using
[9:42 AM] coalpha: if it could me made constexpr, the way to check if it's empty
                   would be the way that you're [sharchini] doing it up there
                   with std::string_view
*/
// This code is sharchini's from the rwxrob public discord server

#include <string>
#include <iostream>
#define str constexpr const string_view

using namespace std;

template<int i> str greeting;

template<> str greeting<0> = "hello";
template<> str greeting<1> = ", ";
template<> str greeting<2> = "world";
template<> str greeting<3> = "!";
template<> str greeting<4> = "\n";

template<int i = 0>
void loop() {
   str curr{greeting<i>};
   if constexpr (!curr.empty()) {
      cout << curr;
      loop<i + 1>();
   }
}

int main() {
   loop();
}
