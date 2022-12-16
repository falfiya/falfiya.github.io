type flat<t> = t extends Array<infer i> ? flat<i> : t;
function flat<a extends any[]>(a: a): flat<a>[] {
   return a.flat(Infinity) as never;
}

class KliesliArray<t> extends Array<flat<t>> {
   static new<t>(): KliesliArray<flat<t>>;

   // @ts-expect-error
   push(...items: t[]): number {
      return super.push(...flat(items));
   }

   // @ts-expect-error
   map<u>(mapper: (value: flat<t>) => u): KliesliArray<flat<u>> {
      
   }
}

[].map


const x = new KliesliArray<number[]>
