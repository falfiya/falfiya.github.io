function add<T>(a: T, b: T extends string ? void : T): T {
   return a as any + b;
}

add(1 as number, 2);
add("3", "4");
