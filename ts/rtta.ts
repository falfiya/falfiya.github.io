import {$extends, satisfies} from "./type_traits";

export interface assertable<T = any> {
   assert(u: unknown): asserts u is T;
};

export type unknown_assertable = {assert(u: unknown): void};

export namespace assertable {
   export function is(u: unknown): u is {assert(u: unknown): void} {
      return true
         && typeof u === "object"
         && u !== null
         && typeof (u as any).assert === "function";
   }
}

export namespace string {
   export function assert(u: unknown): asserts u is string {
      if (typeof u !== "string") {
         throw new TypeError("not string!");
      }
      void (null as satisfies<$extends<string, typeof u>>);
   }
}

export namespace number {
   export function assert(u: unknown): asserts u is number {
      if (typeof u !== "number") {
         throw new TypeError("not number!");
      }
      void (null as satisfies<$extends<number, typeof u>>);
   }
}

export namespace boolean {
   export function assert(u: unknown): asserts u is boolean {
      if (typeof u !== "boolean") {
         throw new TypeError("not boolean");
      }
      void (null as satisfies<$extends<boolean, typeof u>>);
   }
}

export namespace object {
   export function assert(u: unknown): asserts u is {} {
      if (typeof u !== "object") {
         throw new TypeError("not object!");
      }
      if (u === null) {
         throw new TypeError("was null");
      }
      void (null as satisfies<$extends<{}, typeof u>>);
   }
   export function keys<o extends {}>(o: o): (keyof o)[] {
      return Object.keys(o) as any;
   }
}

export type asserts_to<schema extends {}> = {
   [field in keyof schema]:
   schema[field] extends assertable<infer T> ? T : asserts_to<schema[field]>
}

type assert_node = {assert(u: unknown): void} | {[key in string]: assert_node};

function make_assert<schema extends assert_node>(schema: schema):
   {(u: unknown): asserts u is asserts_to<schema>}
{
   const rec = (schema: schema, u: unknown) => {
      console.log(JSON.stringify(schema), u)
      if (assertable.is(schema)) {
         schema.assert(u);
         return;
      }

      for (const key of object.keys(schema)) {
         rec(schema[key] as any, (u as any)[key]);
      }
   };

   return (u: unknown) => rec(schema, u);
}

const cat_a = {
   name: string,
   breed: string,
   is_happy: boolean,
   measurements: {
      length: number,
      height: number,
      weight: number,
   },
};

type cat = asserts_to<typeof cat_a>;
namespace cat {
   export const assert: {(u: unknown): asserts u is cat}
      = make_assert(cat_a);
}

const test_cat = {
   name: "tom cat",
   breed: "idk"
};

cat.assert(test_cat);

export declare const dummy: void;
