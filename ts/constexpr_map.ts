declare const tuple: ["Hello", "World", "!"];

function f<ary extends any[]>(ary: [...ary]): {[K in keyof ary]: [ary[K]]} {
   return ary.map(v => [v]) as any;
}

const e = f(tuple);

function unflatten<T>(T: T): [T] {
   return [T];
}

/* doesn't work for no apparent reason
function map<
   ary extends any[],
   fns extends {[i in keyof ary]: <U>(v: ary[i]) => U}
>(ary: [...ary], fn: fns[number]): {[i in keyof ary]: [ReturnType<fns[i]>]}
{
   return ary.map(fn) as any;
}

const q = map(tuple, unflatten);
*/
