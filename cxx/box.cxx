// CIS250
// Doing a dumb school assignment for a class I've never been in
// Learning how to do genericish programming as well with this
#include <iostream>
using namespace std;

#define get(F, f,ield) \
   constexpr int get##F##ield() const noexcept { return this->f##ield; }
#define set(F, f,ield) \
   inline void set##F##ield(int _) noexcept { this->f##ield = _; }

class Box {
   int width{};
   int height{};
   int depth{};
public:
   constexpr explicit Box() noexcept = default;
   constexpr explicit Box(int w, int h, int d) noexcept:
      width(w),
      height(h),
      depth(d)
   {}

   static constexpr auto NON_ZERO_WARNING{"(not all dimensions are nonzero) "};
   // [4:09 PM] cqwrteur: member functions inside classes are inline by default
   // [4:09 PM] cqwrteur: but marking every function as inline is a simple rule
   constexpr int calcArea() const noexcept {
      auto area{0
         + (2 * width * height)
         + (2 * depth * height)
         + (2 * width * depth )
      };
      if (!area) {
         cout << NON_ZERO_WARNING;
      }
      return area;
   }

   constexpr int calcVolume() const noexcept {
      auto volume{depth * width * height};
      if (!volume) {
         cout << NON_ZERO_WARNING;
      }
      return volume;
   }

   get(W, w,idth);
   get(H, h,eight);
   get(D, d,epth);

   set(W, w,idth);
   set(H, h,eight);
   set(D, d,epth);
};

int main() {
   cout << "Name:   Cole Gannon -  Program Name:  Box -  Date: 122520\n";
   // Box 1 - Test Parameterized constructor, area of sides and volume functions
   constexpr Box B1(1, 2, 3);
   cout << ""
      "Width  = " << B1.getWidth()   << "\n"
      "Area   = " << B1.calcArea()   << "\n"
      "Volume = " << B1.calcVolume() << "\n"
   "\n";

   // Box 2 - Test set functions, Volume, getHeight and area functions
   Box B2;
   B2.setWidth(2);
   B2.setHeight(3);
   B2.setDepth(4);

   cout << ""
      "Height = " << B2.getHeight()  << "\n"
      "Area   = " << B2.calcArea()   << "\n"
      "Volume = " << B2.calcVolume() << "\n"
   "\n";

   // Box 3 - Test zero value error for calc Area and Volume of sides functions
   Box B3;
   B3.setWidth(3);
   B3.setHeight(4);

   cout << ""
      "Depth  = " << B3.getDepth()   << "\n"
      "Area   = " << B3.calcArea()   << "\n"
      "Volume = " << B3.calcVolume() << "\n"
   ;
}
