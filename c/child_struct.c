struct parent {
   int a;
};

struct child {
   struct parent;
   int b;
};

void take_parent_ptr(struct parent *);

int main(void) {
   struct parent p;
   struct child c;
   take_parent_ptr(&p);
   // bruh
   take_parent_ptr(&c);
}
