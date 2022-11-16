// simpler newtype and corrected to allow for unions and type narrowing
export {};

declare const phi: unique symbol;

type union_to_intersection<u> =
   (u extends any ? {(k: u): void} : never) extends {(k: infer t): void} ? t : never;
type newtype_partials_union<phi_uniq_union extends keyof any> =
   {[k in phi_uniq_union]: {[phi]: {[_ in k]: void}}}[phi_uniq_union];

export type newtype<uniq extends string | symbol> = {[phi]: {[k in uniq]: void}};
export type unwrap<outer> =
   outer extends {[phi]: {}}
      ? outer extends infer inner & union_to_intersection<newtype_partials_union<keyof outer[typeof phi]>>
         ? inner
         : never
      : outer;
export function unwrap<outer>(outer: outer): unwrap<outer> {
   return outer as never;
}
