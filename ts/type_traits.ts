export type is<a, b> = a extends b ? b extends a ? true : false : false;
export type enable_if<b extends boolean, T> = b extends true ? {type: T} : {type: number};
export type enable_if_t<b extends boolean, T> = enable_if<b, T>["type"]
export type extend<T, U> = T extends U ? true : false;
export type not<T> = T extends true ? false : true;
export type $extends<parent, child> = child extends parent ? true : false;
declare const unsatisfiable: unique symbol;
export type satisfies<T> = T extends true ? never : typeof unsatisfiable;

export type uniq<ary extends readonly [...(keyof any)[]], seen extends {} = {}> =
   ary extends readonly []
   ? true
   : ary extends readonly [infer head, ...infer tail]
      ? head extends keyof any
         ? seen extends {[key in head]: void}
            ? false
            : tail extends readonly [...(keyof any)[]]
               ? uniq<tail, seen & {[key in head]: void}>
               : never
         : never
      : never;
