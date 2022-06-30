import {$key, is_narrow} from "./type_traits";
import {assertable, number, object, asserts_to, string, unknown_assertable} from "./rtta";

export type entry = {pk: $key; value: any};
export type filter_by<needle extends entry, haystack extends readonly [...any[]]> =
haystack extends readonly [infer head, ...infer tail]
   ? head extends {[key in needle["pk"]]: needle["value"]}
      ? head
      : filter_by<needle, tail>
   : never;

class table
<
   schema extends {[pk in string]: assertable<keyof any>},
   row extends asserts_to<schema> = asserts_to<schema>,
   rows extends row = never,
>
{
   schema: schema;
   bindings: {[pk in keyof schema]: {[pk_lookup in pk]: row}};

   constructor (schema: schema) {
      this.schema = schema;
      this.bindings = Object.create(null) as any;
      for (const key of object.keys(schema)) {
         this.bindings[key] = Object.create(null);
      }
   }

   add<new_row extends row>(new_row: new_row): {
      [pk in keyof schema]:
         // narrow typecheck
         is_narrow<new_row[pk]> extends true
            // unique check
            ? new_row[pk] extends rows[pk]
               ? false // false is the sad path
               : never
            : false
   }[keyof schema] extends never ? table<schema, row, rows | new_row> : never
   {
      for (const pk in object.keys(this.schema)) {
         const as: unknown_assertable = this.schema[pk];
         as.assert(new_row[pk]);

         const these_bindings = this.bindings[pk] as any;

         const current_pv = new_row[pk];
         if (object.hop(current_pv as string, these_bindings)) {
            throw new Error(`Duplicate entry for ${current_pv}!`);
         } else {
            these_bindings[current_pv] = new_row;
         }
      }
      return this as never;
   }
}

const tbl = new table({id: number, name: string})
   .add({id: 10380, name: "coalpha"} as const)
   .add({id: 10111, name: "j1ng3r"} as const);

let fails;
fails = tbl.add({id: 0, name: "not narrow!"});
fails = tbl.add({id: 0, name: "coalpha"} as const); // not unique
