#include "ourmalloc.h"

int main() {
   int *ptr = new(sizeof(int) * 42);
   delete(ptr);
}
