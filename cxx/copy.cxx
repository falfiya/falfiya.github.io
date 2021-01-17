#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
   string froms;
   cout << "Copy from: ";
   getline(cin, froms);

   string tos;
   cout << "Copy to: ";
   getline(cin, tos);

   ifstream from(froms, ios::binary);
   ofstream to(tos, ios::binary);

   size_t len = 8000;
   char ibuf[len];
   char obuf[len];

   from.rdbuf()->pubsetbuf(ibuf, len);
   to.rdbuf()->pubsetbuf(obuf, len);

   to << from.rdbuf();
}
