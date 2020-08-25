#include <stdarg.h>
#include <string.h>
#include <stdio.h>

#define null ((void *) 0)

typedef union Prim_u {
   void *ptr;

   long long ll;
   signed long long sll;
   unsigned long long ull;

   long double ldbl;
} Prim_t;

typedef enum Type_e {
   TYPE_PTR,
   TYPE_LL,
   TYPE_SLL,
   TYPE_ULL,
   TYPE_LDBL,
   TYPE_ERR,
} Type_t;

typedef struct Any_s {
   Type_t type;
   Prim_t as;
   struct Any_s (*call)(struct Any_s self, char *method_name, ...);
} Any_t;

typedef struct Method_s {
   char *name;
   Any_t (*fn)(Any_t self, va_list args);
} Method_t;

#define TABLE_MAX unsigned short

typedef struct VTable_s {
   char *name;
   Method_t *methods;
   TABLE_MAX length;
} VTable_t;

Any_t make_err(char *msg) {
   
}

Any_t call_nothing(Any_t self, char *method_name, ...) {
   
}

Any_t call_with(VTable_t table, Any_t self, char *method_name, va_list forwarded_args) {
   TABLE_MAX i = table.length;
   Method_t current_method = table.methods[i];
   while (i --> 0) {
      if (strcmp(current_method.name, method_name) == 0) {
         return current_method.fn(self, forwarded_args);
      }
   }

   return make_err("Could not find that method name");
}

Any_t ll_say_self(Any_t self, va_list _) {
   printf("%lld\n", self.as.ll);
}

VTable_t LL_table = {
   .name = "long long",
   .methods = (Method_t[]) {
      (Method_t) {
         .name = "say_self",
         .fn = ll_say_self,
      }
   },
};

Any_t call_ll(Any_t self, char *method_name, ...) {
   va_list forwarded_args;
   va_start(forwarded_args, method_name);
   Any_t res = call_with(LL_table, self, method_name, forwarded_args);
   va_end(forwarded_args);
   return res;
}

Any_t make_ll(long long ll) {
   return (Any_t) {
      .type = TYPE_LL,
      .as = (Prim_t) ll,
      .call = call_ll,
   };
}

int main() {
   Any_t one = make_ll(1);
   one.call(one, "say_self");
}
