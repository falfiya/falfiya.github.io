import res from "./res";

const endpoint = "https://maplestory.nexon.net/api/ranking" as const;

async function get_player_ranking
<character_name extends string> (character_name: character_name){
   const ary = await (
      fetch(`${endpoint}?rebootIndex=0&character_name=${character_name}`)
         .then(res => res.json())
   );

   if (ary === null) {
      throw new TypeError("Response was null");
   }

   if (ary.length > 1) {
      throw new TypeError("Response had more than one array element");
   }

   return ary[0] as Promise<res<character_name>>;
}

export {get_player_ranking};
