export {};

interface fn<t = unknown, u = unknown> {
   arg: t;
   ret: u;
}
type app<f extends fn, arg> = ({arg: arg} & f)["ret"];
type predicate = fn<unknown, boolean>;
type filter<pred extends predicate, tpl extends [...any[]]> =
   tpl extends [infer head, ...infer tail extends [...any[]]]
      ? [...(app<pred, head> extends true ? [head] : []), ...filter<pred, tail>]
      : [];
interface not<pred extends predicate> {
   arg: unknown;
   ret: app<pred, this["arg"]> extends true ? false : true;
}

interface is_never {
   arg: unknown;
   // this is marcus's
   ret: [this["arg"]] extends [never] ? true : false;
}

type a = [1, 2, never, 4, never];
type b = filter<is_never, a>;      //:: [never, never]
type c = filter<not<is_never>, a>; //:: [1, 2, 4]
