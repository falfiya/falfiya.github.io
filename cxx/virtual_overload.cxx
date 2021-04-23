struct base {
   size_t val;
   virtual base &operator+(base const &) = 0;
};

struct derived: public base {
   derived(size_t const val) {
      this->val = val;
   }

   base &operator+(base const &other) override {
      this->val += {other.val};
      return *this;
   }
};

#include <iostream>

int main() noexcept {
   base *a = new derived{30};
   base *b = new derived{40};

   std::cout << (*a + *b).val << '\n';
}
