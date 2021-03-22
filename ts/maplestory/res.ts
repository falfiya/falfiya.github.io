import jobs from "./jobs";
import worlds from "./worlds";

type msavatar = "https://msavatar1.nexon.net";

type probably_null = null | unknown;

type res<
   character_name extends string,
   world extends worlds = worlds,
   job_id extends keyof jobs = keyof jobs,
> = {
   Rank: number;
   CharacterImgUrl: `${msavatar}/Character/${string}.png`;
   PetImgUrl: `${msavatar}/Character/${string}.png`;
   WorldName: world["name"];
   JobName: jobs[job_id];
   IsSearchTarget: boolean;
   TimeSum: number;
   Stage: number;
   StarSum: number;
   LegionLevel: number;
   RaidPower: number;
   GuildName: string | null;
   AccountId: null;
   Score: probably_null;
   CombatPower: probably_null;
   MatchSN: probably_null;
   Percentile: probably_null;
   SeasonNo: number;
   CharacterID: 0;
   CharacterName: character_name;
   Exp: number;
   Gap: number;
   JobDetail: number;
   JobID: job_id;
   Level: number;
   StartRank: number;
   TransferStatus: number;
   WorldId: world["id"];
};

export default res;
