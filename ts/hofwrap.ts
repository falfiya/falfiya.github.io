declare const _: unique symbol;
type _<t> = t & {[_]: typeof _};

type exclaim<x extends string | number> = `${x}!`;

type z = exclaim<_<string>>;
