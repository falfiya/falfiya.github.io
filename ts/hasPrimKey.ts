type StringPrims = {
   string: string;
   number: number;
   bigint: BigInt;
   boolean: boolean;
   symbol: Symbol;
   undefined: undefined;
   object: object | null;
   function: Function;
};

export function hasPrimKey
<O extends {}, K extends PropertyKey, T extends keyof StringPrims>
(o: O, k: K, t: T): o is O & Record<K, StringPrims[T]>
{
   return Object.hasOwnProperty.call(o, k) && typeof o === t;
}
