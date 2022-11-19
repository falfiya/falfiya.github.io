namespace implicit_only {
   declare const us: unique symbol;
   type us = typeof us;
   export function id
      <_ extends us = us, x = unknown>
         (x: _ extends never ? never : x): x
   {
      return x;
   };
}
export import id = implicit_only.id;

const good = id(1)
const bad1 = id<never, number>(1);
const bad2 = id<symbol, number>(1);
