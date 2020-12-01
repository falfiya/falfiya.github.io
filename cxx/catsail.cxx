#include <initializer_list>
#include <iostream>
#include <sstream>
#include <string>
#include <iomanip>
#include <variant>

using namespace std;

template <class T>
void il_to_ss(initializer_list<T> il, stringstream &ss) {
   auto args = il.begin();
   auto len = il.size();

   ss << '{';
   if (len > 0) {
      ss << '"';
      ss << args[0];
      ss << '"';
   }

   for (int i(1); i < len; ++i) {
      ss << ", \"" << args[i] << '"';
   }
   ss << '}';
};

class obj {
   inline void pre() {
      stringstream ss{};
      ss
         << '['
         << this->name
         << "] ";
      cout << left << setw(10) << ss.str();
   }

   inline void print_invocation() {
      pre();
      cout << this->invoked << '\n';
   }

public:
   string name;
   string invoked;

   explicit obj() : name("?dr") {
      this->invoked = "obj()";
      print_invocation();
   }

   explicit obj(string name) : name(name) {
      this->invoked = string("obj(\"") + name + "\")";
      print_invocation();
   }

   // would allow only obj{};
   // explicit obj(initializer_list<string> il);

   // copy constructors can be explicit but in doing that,
   // it means that you can't do obj = other
   // see https://stackoverflow.com/a/11480654
   obj(const obj &other) : name("&" + other.name) {
      this->invoked = string("obj _ = ") + other.name;
      print_invocation();
   }

   obj(obj &&other) : name("&&" + other.name) {
      this->invoked = string("obj ") + other.name + " = " + other.invoked;
      print_invocation();
   }

   // removing the explicit from here allows this constructor to be called
   // with or without the equals
   // obj var{};
   // obj var = {};
   obj(initializer_list<string> il) {
      stringstream ss{};
      ss << "obj";
      il_to_ss(il, ss);

      auto first{il.begin()};
      if (first != nullptr) {
         this->name = *first;
      } else {
         this->name = "?il";
      }

      this->invoked = ss.str();
      print_invocation();
   }

   ~obj() {
      pre();
      cout << "~obj()\n";
   }

   obj &operator = (const obj &other) {
      // log("copy assignment");
      return *this;
   }
};

int main() {
   obj cat;
   obj pine ("pine");
   obj tar  {"tar"};

   obj oil = pine;

   obj fall = obj("fall");
   obj sail = obj{"sail"};

   obj leaf = {"leaf"};
}
