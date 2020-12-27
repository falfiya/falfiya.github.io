// CIS250
// Doing a dumb school assignment for a class I've never been in
#include <iostream>
using namespace std;

#define get(F, f,ield) \
   inline int get##F##ield() const noexcept { return this->f##ield; }
#define set(F, f,ield) \
   inline void set##F##ield(int _) noexcept { this->f##ield = _; }

class Box {
   int width;
   int height;
   int depth;
public:
   explicit Box() = default;
   explicit Box(int w, int h, int d):
      width(w),
      height(h),
      depth(d)
   {}

   // [4:09 PM] cqwrteur: member functions inside classes are inline by default
   // [4:09 PM] cqwrteur: but marking every function as inline is a simple rule
   inline int calcArea() const noexcept {
      if (width & height & depth) {
         return 0
            + (2 * width * height)
            + (2 * depth * height)
            + (2 * width * depth )
            ;
      }
      cout << "Not all dimensions are nonzero.\n";
      return 0;
   }

   inline int calcVolume() const noexcept {
      if (width & height & depth) {
         return depth * width * height;
      }
      cout << "Not all dimensions are nonzero.\n";
      return 0;
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
   Box B1(1, 2, 3);
   cout << ""
      "Width  = " << B1.getWidth()   << "\n"
      "Area   = " << B1.calcArea()   << "\n"
      "Volume = " << B1.calcVolume() << "\n"
   ;

   // Box 2 - Test set functions, Volume, getHeight and area functions
   Box B2;
   B2.setWidth(2);
   B2.setHeight(3);
   B2.setDepth(4);

   cout << ""
      "Height = " << B2.getHeight()  << "\n"
      "Area   = " << B2.calcArea()   << "\n"
      "Volume = " << B2.calcVolume() << "\n"
   ;

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
