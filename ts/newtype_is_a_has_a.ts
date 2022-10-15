declare const dirent_symbol: unique symbol;
type dirent_t = {readonly [dirent_symbol]: void}

module is_a {
   type dirent<val extends string = string> = val & dirent_t;
   function make_dirent<val extends string>(val: val) {
      if (val.includes('\\')) {
         throw new TypeError(`${val} is not a dirent!`);
      }
      return val as dirent<val>;
   }

   const uname = make_dirent("coalpha"); //:t dirent<"coalpha">

   function make_home<val extends dirent>(val: val) {
      return `/home/${val}` as `/home/${val extends dirent<infer T> ? T : never}`;
   }
   export const home = make_home(uname);
}

module has_a {
   type dirent = string & dirent_t;
   function make_dirent<val extends string>(val: val) {
      if (val.includes('\\')) {
         throw new TypeError(`${val} is not a dirent!`);
      }
      return val as val & dirent;
   }
   const uname = make_dirent("coalpha"); //:t "coalpha" & dirent_t

   function make_home<val extends dirent>(val: val) {
      return `/home/${val}` as `/home/${val extends infer T & dirent_t ? T : never}`;
   }
   export const home = make_home(uname);
}

export {};
