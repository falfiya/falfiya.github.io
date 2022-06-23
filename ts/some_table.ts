import {map_get} from "./map_get";
import {$key, satisfies, uniq} from "./type_traits";

const students = [
   {name: "coalpha", id: 10380},
   {name: "j1ng3r" , id: 10111},
] as const;
type students = typeof students;

type unique_constraint<key extends $key>
   = satisfies<uniq<map_get<key, students>>>;

void (null as unique_constraint<"name">);
void (null as unique_constraint<"id">);

export type filter = {key: $key; value: any};
export type filter_by<needle extends filter, ary extends readonly [...any[]]> =
   ary extends readonly [infer head, ...infer tail]
   ? head extends {[key in needle["key"]]: needle["value"]}
      ? head
      : filter_by<needle, tail>
   : never;


type coalpha_id = filter_by<{key: "name", value: "coalpha"}, students>["id"];
