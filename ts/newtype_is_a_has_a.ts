declare const dirent_symbol: unique symbol;
type dirent_newtype = {readonly [dirent_symbol]: void}

module is_a {
   type dirent<val extends string> = val & dirent_newtype;
   function make_dirent<val extends string>(val: val) {
      if (val.includes('\\')) {
         throw new TypeError(`${val} is not a dirent!`);
      }
      return val as dirent<val>;
   }

   const uname = make_dirent("coalpha"); //:t dirent<"coalpha">

   type home<val extends string, val_ extends dirent<val>> = `/home/${val}`;
}

module has_a {
   type dirent = string & dirent_newtype;
   function make_dirent<val extends string>(val: val) {
      if (val.includes('\\')) {
         throw new TypeError(`${val} is not a dirent!`);
      }
      return val as val & dirent;
   }
   const uname = make_dirent("coalpha"); //:t "coalpha" & {readonly [dirent_symbol]: void;}

   function make_home<val extends dirent>(val: val) {
      return `/home/${val}` as `/home/${val extends infer T & dirent_newtype ? T : never}`;
   }
   const home = make_home(uname);
}
