declare const uint_symbol: unique symbol;

module is_a {
   type uint<val extends number> = val & {readonly [uint_symbol]: void};
   const make_uint = <val extends number>(val: val) => val as uint<val>;
   const one = make_uint(1);
   one;
}

module has_a {
   type uint = number & {readonly [uint_symbol]: void};
   const make_uint = <val extends number>(val: val) => val as val & uint;

   const id_weak = (val: uint) => val;
   const id_strong = <val extends number>(val: val) =>
      val + 1 as val;

   const one = make_uint(1);
   const one_weak = id_weak(one);
   const one_strong = id_strong(one);
}
