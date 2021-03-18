const api = "https://maplestory.nexon.net/api/";
const ranking = `${api}/ranking`;

function make_params(character_name) {
   return `rebootIndex=0&character_name=${character_name}`;
}

async function get_player_ranking(character_name) {
   const ary = await (
      fetch(`${ranking}?${make_params(character_name)}`)
         .then(res => res.json())
   );

   if (ary === null) {
      throw new TypeError("Response was null");
   }

   if (ary.length > 1) {
      throw new TypeError("Response had more than one array element");
   }

   return ary[0];
}

exports.get_player_ranking = get_player_ranking;
