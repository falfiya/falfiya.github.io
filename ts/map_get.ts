export type map_get<field extends keyof any, ary extends readonly [...any[]]> =
   ary extends []
   ? []
   : ary extends readonly [infer head, ...infer tail]
      ? field extends keyof head
         ? tail extends readonly [...any[]]
            ? [head[field], ...map_get<field, tail>]
            : never
         : never
      : never;

function map_get
   <field extends string, ary extends readonly [...any[]]>
      (field: field, ary: ary): map_get<field, ary>
{
   const l = ary.length;
   const out = Array(l);
   for (let i = 0; i < l; i++) {
      out[i] = ary[i][field];
   }
   return out as any;
}

const cat_noise_info = [
   {lang: "en", noise: "meow" },
   {lang: "fr", noise: "miaou"},
   {lang: "de", noise: "miau" },
   {lang: "it", noise: "miao" },
   {lang: "jp", noise: "nya"  },
   {lang: "ru", noise: "myau" },
   {lang: "ko", noise: "yaow" },
   {lang: "es", noise: "miau" },
   {lang: "se", noise: "mjau" },
] as const;

export const cat_noises = map_get("noise", cat_noise_info);
