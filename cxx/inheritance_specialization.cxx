#include <iostream>
using namespace std;

struct Animal {
   void speak() const noexcept {
      cout << "I cannot speak for I have no tongue...\n";
   }
};
struct Feline: Animal {
   void meow() const noexcept {
      cout << "Roar!\n";
   }
};
struct HouseCat: Feline {};

template <class T>
void speak(T t) noexcept {
   t.speak();
}

template <>
void speak<Feline>(Feline f) noexcept {
   f.meow();
}

int main() noexcept {
   HouseCat tom{};
   Animal jerry{};
   Feline hobbes{};

   speak(tom);
   speak(jerry); // suffering
   speak(hobbes);
}
