#include <limits>
#include <cmath>
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include "geometry.hh"
using namespace std;

void render(string filename) {
   const int width  = 1024;
   const int height = 768;
   vector<Vec3f> framebuffer(width*height);

   for (size_t j = 0; j<height; j++) {
      for (size_t i = 0; i<width; i++) {
         framebuffer[i+j*width] = Vec3f(j/float(height),i/float(width), 0);
      }
   }

   ofstream ofs; // save the framebuffer to file
   ofs.open(filename);
   ofs << "P6\n" << width << " " << height << "\n255\n";
   for (size_t i = 0; i < height*width; ++i) {
      for (size_t j = 0; j<3; j++) {
         ofs << static_cast<char>(255 * std::max(0.f, std::min(1.f, framebuffer[i][j])));
      }
   }
   ofs.close();
}

int main() {
   cout << "What should I call the png?\n";
   string filename{};
   string cmd{};
   cmd.push_back("convert");
   cin >> filename;
   render(filename);
   system(cmd + filename + ".ppm " + filename + ".png");
   remove("./out.ppm");
   return 0;
}
