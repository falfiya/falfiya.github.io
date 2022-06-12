import {$key} from "./type_traits";
import {assertable, asserts_to, object, unknown_assertable} from "./rtta";

export type entry = {pk: $key; value: any};
export type filter_by<needle extends entry, haystack extends readonly [...any[]]> =
haystack extends readonly [infer head, ...infer tail]
   ? head extends {[key in needle["pk"]]: needle["value"]}
      ? head
      : filter_by<needle, tail>
   : never;

export type exists_entry<needle extends entry, haystack extends readonly [...any[]]> =
   haystack extends readonly []
   ? false
   : haystack extends [infer head, ...infer tail]
      ? head extends readonly {[pk in needle["pk"]]: needle["value"]}
         ? true
         : exists_entry<needle, tail>
      : never;

type exists_duplicates<a extends readonly [...any[]], b extends readonly [...any[]]> =
   a extends readonly []
   ? false
   : a extends readonly [infer head, ...infer tail]
      ? exists_entry<head, b>;

class table<schema extends {[pk in string]: assertable}, entries extends {[]}> {
   already_mapped: {[pk in keyof schema]: never};
   schema: schema;

   constructor (schema: schema) {
      this.schema = schema;
      this.primary_keys = Object.create(null) as any;
      for (const key in object.keys(schema)) {
         (this.primary_keys as any)[key] = Object.create(null);
      }
   }

   c_add_entries<new_entries extends [...asserts_to<schema>[]]>(new_entries: new_entries, dummy: exists_entry):
      asserts this is table<schema, [...entries, ...new_entries]>
   {
      for (const entry of new_entries) {
         for (const pk in object.keys(this.schema)) {
            const atype: unknown_assertable = this.schema[pk];
            atype.assert(entry[pk]);

            const current_pk_value = entry[pk];
            (this.primary_keys[pk] as any)[current_pk_value] = entry;
         }
      }
   }

   get<
}
