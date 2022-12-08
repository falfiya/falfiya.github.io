export {};
declare const phi: unique symbol;
type union_to_inter<u> = (u extends any ? {
    (k: u): void;
} : never) extends {
    (k: infer t): void;
} ? t : never;
type newtype_partials_union<phi_uniq_union extends keyof any> = {
    [k in phi_uniq_union]: {
        [phi]: {
            [_ in k]: void;
        };
    };
}[phi_uniq_union];
type newtype_inter<uniqs extends keyof any> = union_to_inter<newtype_partials_union<uniqs>>;
export type newtype<uniq extends string | symbol> = {
    [phi]: {
        [k in uniq]: void;
    };
};
export type unwrap<outer> = outer extends {
    [phi]: {};
} ? outer extends infer inner & newtype_inter<keyof outer[typeof phi]> ? inner : never : outer;
export declare function unwrap<outer>(outer: outer): outer;
