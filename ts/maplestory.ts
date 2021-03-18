type msavatar = "https://msavatar1.nexon.net";

type worlds =
   | {id:  0; key: "scania";      name: "Scania"}
   | {id:  1; key: "bera";        name: "Bera"}
   | {id: 17; key: "aurora";      name: "Aurora"}
   | {id: 18; key: "elysium";     name: "Elysium"}
   | {id: 45; key: "reboot-(na)"; name: "Reboot (NA)"};

type jobs = {
   1: "Warrior";​
   2: "Magician";​
   3: "Bowman";​
   4: "Thief";​
   5: "Pirate";​
   10: "Noblesse";​
   11: "Dawn Warrior";​
   12: "Blaze Wizard";​
   13: "Wind Archer";​
   14: "Night Walker";​
   15: "Thunder Breaker";​
   20: "Legend";​
   21: "Aran";​
   22: "Evan";​
   23: "Mercedes";​
   24: "Phantom";​
   30: "Citizen";​
   31: "Demon Slayer";​
   32: "Battle Mage";​
   33: "Wild Hunter";​
   35: "Mechanic";​
   64: "Cadena";​
   113: "Hero";​
   123: "Paladin";​
   133: "Dark Knight";​
   150: "Illium";​
   201: "Jett";​
   202: "Mihile";​
   203: "Luminous";​
   204: "Kaiser";​
   205: "Angelic Buster";​
   206: "Hayato";​
   207: "Kanna";​
   208: "Xenon";​
   209: "Demon Avenger";​
   210: "Zero";​
   211: "Beast Tamer";​
   212: "Shade";​
   213: "Fire/Poison";​
   214: "Kinesis";​
   215: "Blaster";​
   216: "Cadena";​
   217: "Illium";​
   218: "Ark";​
   219: "Pathfinder";​
   220: "Hoyoung";​
   221: "Adele";​
   223: "Ice/Lightning";​
   233: "Bishop";​
   313: "Bow Master";​
   323: "Marksman";​
   413: "Night Lord";​
   423: "Shadower";​
   435: "Blaster Master";​
   513: "Buccaneer";​
   523: "Corsair";​
   533: "Cannon Master";​
   573: "Jett";​
   1113: "Dawn Warrior";​
   1213: "Blaze Wizard";​
   1313: "Wind Archer";​
   1413: "Night Walker";​
   1513: "Thunder Breaker";​
   2113: "Aran";​
   2219: "Evan";​
   2313: "Mercedes";​
   2413: "Phantom";​
   2513: "Shade";​
   2713: "Luminous";​
   3113: "Demon Slayer";​
   3123: "Demon Avenger";​
   3213: "Battle Mage";​
   3313: "Wild Hunter";​
   3513: "Mechanic";​
   3613: "Xenon";​
   3713: "Blaster";​
   4113: "Hayato";​
   4213: "Kanna";​
   5113: "Mihile";​
   6113: "Kaiser";​
   6513: "Angelic Buster";​
   10113: "Zero";​
   11213: "Beast Tamer";​
   14213: "Kinesis";
}

type response<
   character_name extends string,
   world extends worlds,
   job_id extends keyof jobs,
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
   Score: null | unknown;
   CombatPower: null | unknown;
   MatchSN: null | unknown;
   Percentile: null | unknown;
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
