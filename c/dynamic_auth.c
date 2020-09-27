#include <stdint.h>
#include <stdarg.h>
#include <string.h>
#include <stdio.h>

#define null ((void *) 0)

#define ptr_t void *
#define i64_t int64_t
#define u64_t uint64_t
#define f64_t long double

typedef union Prim_u {
   ptr_t ptr;

   i64_t i64;
   u64_t u64;

   f64_t f64;

} Prim_t;

typedef enum Type_e {
   TYPE_PTR,
   TYPE_I64,
   TYPE_U64,
   TYPE_F64,
   TYPE_ERR,
} Type_t;

typedef struct Any_s {
   Type_t type;
   Prim_t as;
   struct Any_s (*call)(struct Any_s self, char *method_name, ...);
} Any_t;

// #define ARGS_MAX uint8_t
// typedef struct MethodArgs_s {
//    ARGS_MAX length;
//    Type_t types[];
// } MethodArgs_t;

typedef struct Method_s {
   char *name;
   // MethodArgs_t args;
   Any_t (*fn)(Any_t self, va_list args);
} Method_t;

#define TABLE_MAX uint8_t // 255 max methods

typedef struct Vtable_s {
   char *name;
   TABLE_MAX length;
   Method_t *methods;
} VTable_t;

Any_t call_nothing(Any_t self, char *method_name, ...) {
   fprintf(stderr, "Cannot call methods on an error value!");
}

Any_t make_err(char *msg) {
   return (Any_t) {
      .type = TYPE_ERR,
      .as = (Prim_t) { .ptr = msg },
      .call = call_nothing,
   };
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

   return make_err("Could not find that method name!");
}

VTable_t *U64_table;

Any_t call_u64(Any_t self, char *method_name, ...) {
   printf("call_ll(, %s)\n", method_name);
   va_list forwarded_args;
   va_start(forwarded_args, method_name);
   Any_t res = call_with(*U64_table, self, method_name, forwarded_args);
   va_end(forwarded_args);
   return res;
}

Any_t make_u64(u64_t u64) {
   printf("make_u64(%lld)", u64);
   return (Any_t) {
      .type = TYPE_U64,
      .as = (Prim_t) u64,
      .call = call_u64,
   };
}

Any_t u64_say_self(Any_t self, va_list _) {
   printf("%lld\n", self.as.u64);
}

Method_t u64_say_self_method = {
   .name = "say_self",
   .fn = u64_say_self,
};

Any_t u64_add(Any_t self, va_list args) {
   return make_u64(self.as.u64 + va_arg(args, Any_t).as.u64);
}

Method_t u64_add_method = {
   .name = "add",
   .fn = u64_add,
};

int main() {
   // setup the vtable
   U64_table = &(VTable_t) {
      .name = "u64",
      .methods = (Method_t[]) {
         u64_say_self_method,
         u64_add_method,
      },
      .length = 2,
   };

   Any_t a = make_u64(22);
   Any_t b = make_u64(47);

   Any_t c = a.call(a, "add", b);
   c.call(c, "say_self");
}
