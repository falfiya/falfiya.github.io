type enable_if<cond, T> = cond extends true ? T : void;
type extend<T, U> = T extends U ? true : false;
type not<T> = T extends true ? false : true;

function add<T, U extends enable_if<not<extend<T, string>>, number>>(a: T, b: U): T {
   return a as any + b;
}

add(1, 2);
add("3", "4");
