exports.info = {
   pages: [
      {
         key: "overall-ranking",
         apiKey: "overall",
         name: "Overall",
         defaultLink: "/overall-ranking/legendary#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Level/Move",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "achievement",
         apiKey: "achievement",
         name: "Achievement",
         defaultLink: "/achievement/Scania#ranking",
         rankColumnItems: [
            {
               name: "Tier",
               hideForMobile: !1,
            }, {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !0,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Score",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "fame-ranking",
         apiKey: "fame",
         name: "Fame",
         defaultLink: "/fame-ranking/legendary#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Fame Gained",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "guild",
         apiKey: "guild",
         name: "Guild",
         defaultLink: "/guild/classic/Scania#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Guild Name",
               hideForMobile: !1,
            }, {
               name: "Guild Level",
               hideForMobile: !1,
            }, {
               name: "Guild Master",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Honor EXP",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "job-ranking",
         apiKey: "job",
         name: "Job",
         defaultLink: "/job-ranking/explorer/beginner#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Level/Move",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "legion",
         apiKey: "legion",
         name: "Legion",
         defaultLink: "/legion/Scania#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "Legion Level",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Raid Power",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "legion-arena",
         apiKey: "legionarena",
         name: "Legion Arena",
         defaultLink: "/legion-arena/season1#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "Arena Squad",
               hideForMobile: !1,
            }, {
               name: "Percentile",
               hideForMobile: !1,
            }, {
               name: "Score",
               hideForMobile: !0,
            }, {
               name: "Raid Power",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "maplerunner",
         apiKey: "maplerunner",
         name: "MapleRunner (Classic)",
         defaultLink: "/maplerunner#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Stars/Stage/Time",
               hideForMobile: !1,
            },
         ],
      }, {
         key: "world-ranking",
         apiKey: "world",
         name: "World",
         defaultLink: "/world-ranking/Scania#ranking",
         rankColumnItems: [
            {
               name: "Rank",
               hideForMobile: !1,
            }, {
               name: "Character",
               hideForMobile: !1,
            }, {
               name: "Character Name",
               hideForMobile: !1,
            }, {
               name: "World",
               hideForMobile: !0,
            }, {
               name: "Job",
               hideForMobile: !1,
            }, {
               name: "Level/Move",
               hideForMobile: !1,
            },
         ],
      },
   ],
   region: ["North America", "Europe"],
   searchTypes: [
      {
         name: "Character Name",
      }, {
         name: "Guild Name",
         showOnlyIn: "Guild",
      }, {
         name: "Ranks",
      },
   ],
   worldUS: [
      {
         id: 0,
         key: "scania",
         name: "Scania",
      }, {
         id: 1,
         key: "bera",
         name: "Bera",
      }, {
         id: 17,
         key: "aurora",
         name: "Aurora",
      }, {
         id: 18,
         key: "elysium",
         name: "Elysium",
      }, {
         id: 45,
         key: "reboot-(na)",
         name: "Reboot (NA)",
      },
   ],
   worldEU: [
      {
         id: 30,
         key: "luna",
         name: "Luna",
      }, {
         id: 46,
         key: "reboot-(eu)",
         name: "Reboot (EU)",
      },
   ],
   seasons: [],
   jobs: [
      {
         id: 0,
         name: "Beginner",
      }, {
         id: 1,
         name: "Warrior",
      }, {
         id: 2,
         name: "Magician",
      }, {
         id: 3,
         name: "Bowman",
      }, {
         id: 4,
         name: "Thief",
      }, {
         id: 5,
         name: "Pirate",
      }, {
         id: 10,
         name: "Noblesse",
      }, {
         id: 11,
         name: "Dawn Warrior",
      }, {
         id: 12,
         name: "Blaze Wizard",
      }, {
         id: 13,
         name: "Wind Archer",
      }, {
         id: 14,
         name: "Night Walker",
      }, {
         id: 15,
         name: "Thunder Breaker",
      }, {
         id: 20,
         name: "Legend",
      }, {
         id: 21,
         name: "Aran",
      }, {
         id: 22,
         name: "Evan",
      }, {
         id: 23,
         name: "Mercedes",
      }, {
         id: 24,
         name: "Phantom",
      }, {
         id: 30,
         name: "Citizen",
      }, {
         id: 31,
         name: "Demon Slayer",
      }, {
         id: 32,
         name: "Battle Mage",
      }, {
         id: 33,
         name: "Wild Hunter",
      }, {
         id: 35,
         name: "Mechanic",
      }, {
         id: 113,
         name: "Hero",
      }, {
         id: 123,
         name: "Paladin",
      }, {
         id: 133,
         name: "Dark Knight",
      }, {
         id: 201,
         name: "Jett",
      }, {
         id: 202,
         name: "Mihile",
      }, {
         id: 203,
         name: "Luminous",
      }, {
         id: 204,
         name: "Kaiser",
      }, {
         id: 205,
         name: "Angelic Buster",
      }, {
         id: 206,
         name: "Hayato",
      }, {
         id: 207,
         name: "Kanna",
      }, {
         id: 208,
         name: "Xenon",
      }, {
         id: 209,
         name: "Demon Avenger",
      }, {
         id: 210,
         name: "Zero",
      }, {
         id: 211,
         name: "Beast Tamer",
      }, {
         id: 212,
         name: "Shade",
      }, {
         id: 213,
         name: "Fire/Poison",
      }, {
         id: 214,
         name: "Kinesis",
      }, {
         id: 215,
         name: "Blaster",
      }, {
         id: 223,
         name: "Ice/Lightning",
      }, {
         id: 233,
         name: "Bishop",
      }, {
         id: 313,
         name: "Bow Master",
      }, {
         id: 323,
         name: "Marksman",
      }, {
         id: 413,
         name: "Night Lord",
      }, {
         id: 423,
         name: "Shadower",
      }, {
         id: 435,
         name: "Blaster Master",
      }, {
         id: 513,
         name: "Buccaneer",
      }, {
         id: 523,
         name: "Corsair",
      }, {
         id: 533,
         name: "Cannon Master",
      }, {
         id: 1113,
         name: "Dawn Warrior",
      }, {
         id: 1213,
         name: "Blaze Wizard",
      }, {
         id: 1313,
         name: "Wind Archer",
      }, {
         id: 1413,
         name: "Night Walker",
      }, {
         id: 1513,
         name: "Thunder Breaker",
      }, {
         id: 2113,
         name: "Aran",
      }, {
         id: 2219,
         name: "Evan",
      }, {
         id: 2313,
         name: "Mercedes",
      }, {
         id: 2413,
         name: "Phantom",
      }, {
         id: 2713,
         name: "Luminous",
      }, {
         id: 2513,
         name: "Shade",
      }, {
         id: 3113,
         name: "Demon Slayer",
      }, {
         id: 3123,
         name: "Demon Avenger",
      }, {
         id: 3213,
         name: "Battle Mage",
      }, {
         id: 3313,
         name: "Wild Hunter",
      }, {
         id: 3513,
         name: "Mechanic",
      }, {
         id: 3613,
         name: "Xenon",
      }, {
         id: 3713,
         name: "Blaster",
      }, {
         id: 4113,
         name: "Hayato",
      }, {
         id: 4213,
         name: "Kanna",
      }, {
         id: 5113,
         name: "Mihile",
      }, {
         id: 6113,
         name: "Kaiser",
      }, {
         id: 6513,
         name: "Angelic Buster",
      }, {
         id: 10113,
         name: "Zero",
      }, {
         id: 11213,
         name: "Beast Tamer",
      }, {
         id: 573,
         name: "Jett",
      }, {
         id: 14213,
         name: "Kinesis",
      }, {
         id: 216,
         name: "Cadena",
      }, {
         id: 64,
         name: "Cadena",
      }, {
         id: 217,
         name: "Illium",
      }, {
         id: 150,
         name: "Illium",
      }, {
         id: 218,
         name: "Ark",
      }, {
         id: 219,
         name: "Pathfinder",
      }, {
         id: 220,
         name: "Hoyoung",
      }, {
         id: 221,
         name: "Adele",
      },
   ],
   classes: [
      {
         key: "explorer",
         name: "Explorer",
         jobsAvailableIn: [0, 1, 2, 3, 4, 5],
      }, {
         key: "cygnus-knights",
         name: "Cygnus Knights",
         jobsAvailableIn: [10, 11, 12, 13, 14, 15],
      }, {
         key: "aran",
         name: "Aran",
         jobsAvailableIn: [20, 21],
      }, {
         key: "Evan",
         name: "Evan",
         jobsAvailableIn: [22],
      }, {
         key: "mercedes",
         name: "Mercedes",
         jobsAvailableIn: [23],
      }, {
         key: "phantom",
         name: "Phantom",
         jobsAvailableIn: [24],
      }, {
         key: "resistance",
         name: "Resistance",
         jobsAvailableIn: [30, 31, 32, 33, 35],
      }, {
         key: "jett",
         name: "Jett",
         jobsAvailableIn: [201],
      }, {
         key: "mihile",
         name: "Mihile",
         jobsAvailableIn: [202],
      }, {
         key: "luminous",
         name: "Luminous",
         jobsAvailableIn: [203],
      }, {
         key: "kaiser",
         name: "Kaiser",
         jobsAvailableIn: [204],
      }, {
         key: "angelic-buster",
         name: "Angelic Buster",
         jobsAvailableIn: [205],
      }, {
         key: "sengoku",
         name: "Sengoku",
         jobsAvailableIn: [206, 207],
      }, {
         key: "xenon",
         name: "Xenon",
         jobsAvailableIn: [208],
      }, {
         key: "resistance",
         name: "Resistance",
         jobsAvailableIn: [209],
      }, {
         key: "zero",
         name: "Zero",
         jobsAvailableIn: [210],
      }, {
         key: "beast-tamer",
         name: "Beast Tamer",
         jobsAvailableIn: [211],
      }, {
         key: "shade",
         name: "Shade",
         jobsAvailableIn: [212],
      }, {
         key: "kinesis",
         name: "Kinesis",
         jobsAvailableIn: [214],
      }, {
         key: "blaster",
         name: "Blaster",
         jobsAvailableIn: [215],
      }, {
         key: "cadena",
         name: "Cadena",
         jobsAvailableIn: [216],
      }, {
         key: "illium",
         name: "Illium",
         jobsAvailableIn: [217],
      }, {
         key: "ark",
         name: "Ark",
         jobsAvailableIn: [218],
      }, {
         key: "pathfinder",
         name: "Pathfinder",
         jobsAvailableIn: [219],
      }, {
         key: "hoyoung",
         name: "Hoyoung",
         jobsAvailableIn: [220],
      }, {
         key: "adele",
         name: "Adele",
         jobsAvailableIn: [221],
      },
   ],
   reboot: [
      {
         id: 1,
         name: "Reboot",
      }, {
         id: 2,
         name: "Non-Reboot",
      }, {
         id: 0,
         name: "Both",
      },
   ],
   overallRankingWeekly: [
      {
         key: "weekly",
         name: "Weekly",
      }, {
         key: "monthly",
         name: "Monthly",
      }, {
         key: "legendary",
         name: "Legendary",
      }, {
         key: "classic",
         name: "Classic",
      }, {
         key: "classic250",
         name: "LV.250 Classic",
      },
   ],
   fameRankingWeekly: [
      {
         key: "weekly",
         name: "Weekly",
      }, {
         key: "monthly",
         name: "Monthly",
      }, {
         key: "legendary",
         name: "Legendary",
      },
   ],
   guildFilter1: [
      {
         key: "classic",
         name: "Classic",
      },
   ],
};
