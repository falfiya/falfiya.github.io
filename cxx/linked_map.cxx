#include <concepts>
#include <string>
#include <iostream> // pain
using namespace std; // cults

template <typename K, typename V>
requires equality_comparable<K>
struct map {
   struct node {
      K const key;
      V val;
      node *next = nullptr;
   };
   node *head;

   constexpr inline node *root() const noexcept {
      return
         __builtin_bit_cast(node *,
            __builtin_bit_cast(char *, this)
               + __builtin_offsetof(map, head)
               - __builtin_offsetof(node, next));
   }

   inline void assoc(K const key, V val) noexcept {
      node *curr = this->root();
      while (true) {
         node *next = curr->next;
         if (next == nullptr) break;
         if (next->key == key) {
            next->val = val;
            return;
         }
         curr = next;
      }

      curr->next = new node{key, val};
   }

   inline V *get(K const key) const noexcept {
      node *curr = this->head;
      while (curr) {
         if (curr->key == key) {
            return &curr->val;
         }
      }
      return nullptr;
   }

   inline ~map() noexcept {
      node *curr = this->head;
      while (curr) {
         node *del = curr;
         curr = curr->next;
         delete del;
      }
   }
};

map<string, string> m{};

inline void print_assoc(string key) noexcept {
   string *val = m.get(key);
   cout << "m[" << key << "] = ";
   if (val == nullptr) {
      cout << "nullptr\n";
   } else {
      cout << *val << '\n';
   }
}

int main() noexcept {
   m.assoc("Hello", "World!");
   print_assoc("Hello");
}
