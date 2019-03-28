#include <iostream>

class TwoInts {
public:
  int one;
  int two;
  TwoInts operator+(const TwoInts& twoInts) {
    TwoInts newObj;
    newObj.one = this->one + twoInts.one;
    newObj.two = this->two + twoInts.two;
    return newObj;
  }
  TwoInts operator*(const TwoInts& twoInts) {
    TwoInts newObj;
    newObj.one = this->one * twoInts.one;
    newObj.two = this->two * twoInts.two;
    return newObj;
  }
  void print() {
    std::cout << "TwoInts { " << this->one << ", " << this->two << " }\n";
  }
};

int main() {
  TwoInts a { 1, 2 };
  TwoInts b { 3, 4 };
  (a + b).print();
  (a * b).print();
  return 0;
}
