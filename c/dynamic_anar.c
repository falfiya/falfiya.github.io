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
   puts(msg);
}

Any_t call_nothing(Any_t self, char *method_name, ...) {
   
}

Any_t call_with(VTable_t table, Any_t self, char *method_name, va_list forwarded_args) {
   TABLE_MAX i = table.length;
   Method_t current_method;
   printf("table.length = %hu\n", table.length);
   while (i --> 0) {
      current_method = table.methods[i];
      printf("current_method.name = %s\n", current_method.name);
      if (strcmp(current_method.name, method_name) == 0) {
         return current_method.fn(self, forwarded_args);
      }
   }

   return make_err("Could not find that method name");
}

VTable_t *LL_table;

Any_t call_ll(Any_t self, char *method_name, ...) {
   printf("call_ll(, %s)\n", method_name);
   va_list forwarded_args;
   va_start(forwarded_args, method_name);
   Any_t res = call_with(*LL_table, self, method_name, forwarded_args);
   va_end(forwarded_args);
   return res;
}

Any_t make_ll(long long ll) {
   printf("make_ll(%lld)", ll);
   return (Any_t) {
      .type = TYPE_LL,
      .as = (Prim_t) ll,
      .call = call_ll,
   };
}

Any_t ll_say_self(Any_t self, va_list _) {
   printf("%lld\n", self.as.ll);
}

Method_t ll_say_self_m = {
   .name = "say_self",
   .fn = ll_say_self,
};

Any_t ll_add(Any_t self, va_list args) {
   return make_ll(self.as.ll + va_arg(args, Any_t).as.ll);
}

Method_t ll_add_m = {
   .name = "add",
   .fn = ll_add,
};

int main() {
   // setup the vtable
   LL_table = &(VTable_t) {
      .name = "long long",
      .methods = (Method_t[]) {
         ll_say_self_m, ll_add_m,
      },
      .length = 2,
   };

   Any_t a = make_ll(22);
   Any_t b = make_ll(47);

   Any_t c = a.call(a, "add", b);
   c.call(c, "say_self");
}
