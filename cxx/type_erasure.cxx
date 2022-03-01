#include <iostream>
using namespace std;

struct Cat {
   void speak() const noexcept {
      cout << "Meow!\n";
   }
};

struct Dog {
   void speak() const noexcept {
      cout << "Woof!\n";
   }
};

template <typename T>
concept has_speak = requires(T t) { t.speak(); };

struct PetPtr {
   struct SpeakVTable {
      virtual void speak(void *that) const noexcept = 0;
      virtual ~SpeakVTable() noexcept = default;
   };

   template <has_speak T>
   struct Impl: public SpeakVTable {
      virtual void speak(void *that) const noexcept override final {
         reinterpret_cast<T *>(that)->speak();
      }
      virtual ~Impl() noexcept = default;
   };

   void *that;
   SpeakVTable *vtable;

   void speak() const noexcept {
      this->vtable->speak(this->that);
   }

   template <has_speak T>
   inline PetPtr(T *that) noexcept {
      this->that = that;
      this->vtable = new Impl<T>();
   }

   inline ~PetPtr() noexcept {
      delete this->vtable;
   }
};

struct Pet {
   struct vtable {
      constexpr virtual void speak() const noexcept = 0;
      constexpr virtual ~vtable() noexcept = default;
   };

   template <has_speak T>
   struct impl: public vtable {
      T that;

      constexpr explicit impl(T &&that): that{that} {};

      constexpr virtual void speak() const noexcept override final {
         this->that.speak();
      }
   };

   vtable *v;

   constexpr void speak() const noexcept {
      this->v->speak();
   }

   template <typename T>
   constexpr Pet(T &&t) noexcept {
      this->v = new impl(move(t));
   }

   constexpr ~Pet() noexcept {
      delete this->v;
   }
};

int main() noexcept {
   PetPtr p1 = new Cat();
   PetPtr p2 = new Dog();
   p1.speak();
   p2.speak();

   // the better way
   Pet p3 = Cat();
   Pet p4 = Dog();
   p3.speak();
   p4.speak();
}
