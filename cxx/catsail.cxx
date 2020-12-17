/*
This entire adventure started off with me reading about templates in dlang.
In there, they mentioned something about perfect forwarding and I remembered
std::forward and I wasn't quite sure what it did.
Down the rabbit hole!
https://eli.thegreenplace.net/2014/perfect-forwarding-and-universal-references-in-c
And there were those mysterious && types so I decided to learn about them.
Thankfully, the author linked to a previous post of his:
https://eli.thegreenplace.net/2011/12/15/understanding-lvalues-and-rvalues-in-c-and-c
In his code, he used the `explicit` operator and I wasn't really sure what that
did. Uh oh, we're three layers down now, learning about initialization and
constructors and oh god this language.
At least I have a name for what I called "uniform assignment", now.
a = {b} is actually called copy-list.
It's not exactly copy-list-initialization but it's close.
There seems to be an entire matrix of
{copy, direct} * {list, rvalue, lvalue, nothing} initialization and assignment.
*/
#include <initializer_list>
#include <iostream>
#include <sstream>
#include <string>
#include <iomanip>

using namespace std;

template <class T>
inline void il_to_ss(initializer_list<T> il, stringstream &ss) {
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

// explicit object
class e_obj {
   inline void pre() {
      stringstream ss{};
      ss
         << '['
         << "e-"
         << this->name
         << "] ";
      cout << left << setw(16) << ss.str();
   }

   inline void print_invocation() {
      pre();
      cout << this->invoked << '\n';
   }
   string name;
   string invoked;
public:
   explicit e_obj() : name("?direct") {
      this->invoked = "e_obj()";
      print_invocation();
   }

   explicit e_obj(string name) : name(name) {
      this->invoked = string("e_obj(\"") + name + "\")";
      print_invocation();
   }

   explicit e_obj(const e_obj &other) : name("L&" + other.name) {
      this->invoked = string("e_obj(&") + other.name + ')';
      print_invocation();
   }

   explicit e_obj(const e_obj &&other) : name("R&&" + other.name) {
      this->invoked = string("e_obj(&&") + other.invoked + ')';
      print_invocation();
   }

   explicit e_obj(const initializer_list<const string> il) {
      stringstream ss{};
      ss << "e_obj";
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

   // ~e_obj() {
   //    pre();
   //    cout << "~obj()\n";
   // }

   e_obj &operator = (const e_obj &other) {
      pre();
      cout << this->name << " = " << other.name << '\n';
      return *this;
   }
};

/// implicit object
class i_obj {
   inline void pre() {
      stringstream ss{};
      ss
         << '['
         << "i-"
         << this->name
         << "] ";
      cout << left << setw(16) << ss.str();
   }

   inline void print_invocation() {
      pre();
      cout << this->invoked << '\n';
   }
   string name;
   string invoked;

public:
   i_obj() : name("?direct") {
      this->invoked = "i_obj()";
      print_invocation();
   }

   i_obj(string name) : name(name) {
      this->invoked = string("i_obj(\"") + name + "\")";
      print_invocation();
   }

   // would allow only obj{};
   // explicit obj(initializer_list<string> il);

   // copy constructors can be explicit but in doing that,
   // it means that you can't do obj = other
   // see https://stackoverflow.com/a/11480654
   i_obj(const i_obj &other) : name("L&" + other.name) {
      this->invoked = string("i_obj(&") + other.name + ')';
      print_invocation();
   }

   i_obj(const i_obj &&other) : name("R&&" + other.name) {
      this->invoked = string("i_obj(&&") + other.invoked + ')';
      print_invocation();
   }

   // removing the explicit from here allows this constructor to be called
   // with or without the equals
   // obj var{};
   // obj var = {};
   i_obj(const initializer_list<const string> il) {
      stringstream ss{};
      ss << "i_obj";
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

   i_obj &operator = (const i_obj &other) {
      pre();
      cout << this->name << " = " << other.name << '\n';
      return *this;
   }

   // ~i_obj() {
   //    pre();
   //    cout << "~obj()\n";
   // }
};

int main() {
   // direct
   e_obj tar;
   e_obj tag{}; // direct list initialization
   e_obj pine("pine");

   // copy
   e_obj tree(pine);
   e_obj rail(e_obj("rail"));

   // initializer list
   e_obj fez({});
   e_obj path{"path"};
   e_obj cat({"cat"});
   e_obj snow({{"snow"}});

   // assignment
   path = snow;

   // direct
   i_obj wet;
   i_obj cute("cute");
   i_obj fire("fire");
   i_obj emsi("emsi");
   i_obj cue{}; // direct list initialization
   i_obj sea = {};

   // copy lvalue
   i_obj pink(cute);
   i_obj span{fire};
   i_obj tune = fire;
   i_obj nest = {cute};

   // copy rvalue
   i_obj mind(i_obj("mind"));
   i_obj rain = i_obj("rain");
   i_obj pawn = {i_obj("pawn")};
   i_obj game{i_obj("game")};
   i_obj rock = string("rock");
   i_obj sand = (string) "sand";

   // initializer list
   i_obj silt{"silt"};
   i_obj soil = {"soil"};

   mind = game;
}

/*
[e-?direct]     e_obj()
[e-?direct]     e_obj()
[e-pine]        e_obj("pine")
[e-L&pine]      e_obj(&pine)
[e-rail]        e_obj("rail")
[e-R&&rail]     e_obj(&&e_obj("rail"))
[e-?il]         e_obj{}
[e-path]        e_obj{"path"}
[e-cat]         e_obj{"cat"}
[e-snow]        e_obj{"snow"}
[e-path]        path = snow
[i-?direct]     i_obj()
[i-cute]        i_obj("cute")
[i-fire]        i_obj("fire")
[i-emsi]        i_obj("emsi")
[i-?direct]     i_obj()
[i-?direct]     i_obj()
[i-L&cute]      i_obj(&cute)
[i-L&fire]      i_obj(&fire)
[i-L&fire]      i_obj(&fire)
[i-L&cute]      i_obj(&cute)
[i-mind]        i_obj("mind")
[i-R&&mind]     i_obj(&&i_obj("mind"))
[i-rain]        i_obj("rain")
[i-R&&rain]     i_obj(&&i_obj("rain"))
[i-pawn]        i_obj("pawn")
[i-R&&pawn]     i_obj(&&i_obj("pawn"))
[i-game]        i_obj("game")
[i-R&&game]     i_obj(&&i_obj("game"))
[i-rock]        i_obj("rock")
[i-R&&rock]     i_obj(&&i_obj("rock"))
[i-sand]        i_obj("sand")
[i-R&&sand]     i_obj(&&i_obj("sand"))
[i-silt]        i_obj{"silt"}
[i-soil]        i_obj{"soil"}
[i-R&&mind]     R&&mind = R&&game
*/
