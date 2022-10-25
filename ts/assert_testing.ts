export {};

type assert_obj<T> = {
   assert(u: unknown): asserts u is T;
   typename: string;
};

const object_assert: assert_obj<{}> = {
   assert(u: unknown): asserts u is ({}) {
      if (typeof u !== "object" || u === null) {
         throw new TypeError("Could not assert value is non-null object!");
      }
   },
   typename: "non-null object",
};
