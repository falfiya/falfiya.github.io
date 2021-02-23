type wsl_mnt<V extends string> = `/mnt/${V}`;

function to_nt_path<V extends string>(v: wsl_mnt<V>) {
   return `${v.slice(4)}:/` as `${V}:/`;
};

const c = to_nt_path("/mnt/c");

console.log(c);


function join<A extends string, B extends string>(A: A, B: B) {
   return `${A}/${B}` as `${A}/${B}`;
};

const p = join(join("mnt", "c"), "users");

console.log(p);
