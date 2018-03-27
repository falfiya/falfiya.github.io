const intersession = true;
/*
staffInstance {
  prefix: (undefined, str),
  firstName: (str),
  lastName: (str),
  role: (str, null)
}
*/
const staff = {
  Melissa: {
    firstName: 'Melissa',
    lastName: 'Mizel',
    role: 'Admin',
  },
  Christy: {
    firstName: 'Christy',
    lastName: 'Knott',
    role: 'Admin',
  },
  Wendy: {
    prefix: 'Dr.',
    firstName: 'Wendy',
    lastName: 'Little',
    role: 'Admin',
  },
  Nicole: {
    firstName: 'Nicole',
    lastName: 'Cerra',
    role: 'Admin',
  },
  Ken: {
    firstName: 'Ken',
    lastName: 'Montgomery',
    role: 'Director',
  },
  Wade: {
    firstName: 'Wade',
    lastName: 'Wilgus',
    role: 'US History Teacher',
  },
  Patrick: {
    firstName: 'Patrick',
    lastName: 'Sullivan',
    role: 'English Teacher',
  },
  Robert: {
    firstName: 'Robert',
    lastName: 'Bolt',
    role: 'Admin',
  },
  Sarah: {
    firstName: 'Sarah',
    lastName: 'Krummel',
    role: 'Admin',
  },
  Greg: {
    firstName: 'Greg',
    lastName: 'Fenner',
    role: 'Chemistry Teacher',
  },
  Ilene: {
    firstName: 'Ilene',
    lastName: 'Mitchell',
    role: 'We await your return',
  },
  Kirstie: {
    firstName: 'Kirstie', // not "Kristie", get it right.
    lastName: 'Gonzales',
    role: 'History Teacher',
  },
  Marcus: {
    firstName: 'Marcus',
    lastName: 'Marsall',
    role: 'Admin',
  },
  Kathleen: {
    firstName: 'Kathleen',
    lastName: "O'dell",
    role: 'College Counselor',
  },
  Galen: {
    firstName: 'Galen',
    lastName: 'McAndrew',
    role: 'Person',
  },
  Richard: {
    firstName: 'Richard',
    lastName: 'Hamblin',
    role: 'Most "Chill" Teacher',
  },
  Ian: {
    firstName: 'Ian',
    lastName: 'Graves',
    role: '"Self Direction" Coach',
  },
  Lessley: {
    firstName: 'Lessley',
    lastName: 'Anderson',
    role: 'English Teacher',
  },
  Lilia: {
    firstName: 'Lilia',
    lastName: 'Pineda',
    role: 'Spanish Teacher',
  },
  Paul: {
    firstName: 'Paul',
    lastName: 'Cerra',
    role: 'IT @d.tech',
  },
  Neal: {
    firstName: 'Neal',
    lastName: 'Addicott',
    role: 'Biology Teacher',
  },
  Emmy: {
    firstName: 'Emmy', // Emmy-Maria actually
    lastName: 'Joseph',
    role: 'Education Specialist',
  },
  Wayne: {
    firstName: 'Wayne',
    lastName: 'Brock',
    role: 'Lead Science & Engineering Instructor @d.tech',
  },
  Nathan: {
    firstName: 'Nathan',
    lastName: 'Pierce',
    role: 'English Teacher',
  },
  Rachel: {
    firstName: 'Rachel',
    lastName: 'Seigman',
    role: 'English Teacher & Model UN & Internship Person',
  },
  Quincy: {
    firstName: 'Quincy',
    lastName: 'Stamper',
    role: null,
  },
  Fannie: {
    firstName: 'Fannie',
    lastName: 'Hsieh',
    role: null,
  },
  Freedom: {
    firstName: 'Freedom',
    lastName: 'Chetini',
    role: 'Math Teacher',
  },
  David: {
    firstName: 'David',
    lastName: 'Groat',
    role: 'Math Teacher',
  },
  Matthew: {
    firstName: 'Mathew',
    lastName: 'Cooley',
    role: 'Math Teacher',
  },
  Unknown: {
    firstName: 'Unknown',
    lastName: 'Null',
    role: null,
  },
};

/*
areaDataInstance {
  type: (null, 0, 1, str), // 0 = break out space, 1 = classroom
  staff: (null, str, ary),
  desc: (null, str),
  schdle: (schdleInstance)
}
*/

const areaData = {
  '1A': {
    type: 0,
    staff: staff.Mizel,
    desc: 'Only the best @d.tech in the school',
  },
  '1B': {
    type: 0,
    staff: staff.Christy,
    desc: "Christy's @d.tech; Knott a bad place to hang out",
  },
  '1C': {
    type: null,
    desc: 'The Hanguar',
  },
  '1D': {
    type: 0,
  },
  '1E': {
    type: 0,
    staff: staff.Wendy,
    desc: "Dr. Little's @d.tech: a nice big open space",
  },
  '2A': {
    type: 0,
    staff: staff.Nicole,
    desc: 'Actually a pretty open space. (Spanish speakers will get it)',
  },
  '2B': {
    type: 0,
  },
  '2C': {
    type: 0,
  },
  '2D': {
    type: 0,
    staff: staff.Robert,

  },
  '2E': {
    type: 0,
    staff: staff.Ken,
  },
  103: {
    type: 1,
    staff: null,
    desc: 'One does not simply walk into Moroder',
  },
  105: {
    type: 1,
    staff: staff.Lilia,
  },
  106: {
    type: 1,
    staff: [staff.Robert, staff.Quincy],
  },
  108: {
    type: 1,
    staff: [staff.Rachel, staff.Kathleen],
    desc: "O'dell's @d.tech meets here",
  },
  120: {
    type: 1,
    staff: [staff.Greg, staff.Fannie],
    desc: "It's the chemistry room; a room for chemistry",
  },
  127: {
    type: 1,
    staff: staff.Wade,
    desc: "d.tush: Design Tech United States History. We're big on puns here",
  },
  129: {
    type: 1,
    staff: null,
    desc: "Hu's classroom is this?",
  },
  130: {
    type: 1,
    staff: staff.Freedom,
    desc: 'Teaches math like blockchain',
  },
  132: {
    type: 1,
    staff: null,
    desc: 'A chill learning enviornment',
  },
  203: {
    type: 1,
    staff: null,
  },
  205: {
    type: 1,
    staff: staff.Matthew,
    desc: "He'll Math You",
  },
  206: {
    type: 1,
    staff: staff.Patrick,
  },
  208: {
    type: 1,
    staff: staff.Kirstie,
  },
  220: {
    type: 1,
    staff: [staff.Neal, staff.Fannie],
    desc: 'Kneel before the power of biology!',
  },
  227: {
    type: 1,
    staff: staff.David,
    desc: "He's the <b>Gr</b>eatest <b>o</b>f <b>a</b>ll <b>t</b>ime",
  },
  229: {
    type: 1,
    staff: null,
    desc: 'The phyisics room: now with walls!',
  },
  230: {
    type: 1,
    staff: staff.Lessley,
    desc: 'Ms. Anderson is visiting The Oracle. Watch out for Cipher',
  },
  232: {
    type: 1,
    staff: staff.Nathan,
    desc: 'These puns are Piercing',
  },
  114: {
    type: 'Design Realization Garage',
    staff: [staff.Galen, staff.Wayne],
    desc: "This is the Design Realization Garage (DRG). It's where fabrication happens.",
  },
  214: {
    type: 'Design Realization Garage',
    staff: null,
    desc: 'This is the upper DRG',
  },
};

/* const periodTimeTypes = {
  'normal',
  'lab',
  'early',
  'late': "Cole Gannon"
}
*/
/*
schdleInstance {
  title: (null, str),
  staff: (null, str)
}
*/
const schoolPeriodScheduleTypes = {
  normal: {
    '8:45': 0,
    '9:41': 1,
    '10:34': 2,
    '10:46': 'Break',
    '11:42': 3,
    '12:12': '@dtech',
    '12:45': 'Lunch',
    '13:41': 4,
    '14:37': 5,
    '15:35': 6,
    '22:00': "School's out: Get out.",
  },
  lab: {
  },
  early: {

  },
  late: 'Cole Gannon',
};
const schoolPeriodSchedule = {
  Mon: schoolPeriodScheduleTypes.normal,
  Tue: schoolPeriodScheduleTypes.normal,
  Wed: schoolPeriodScheduleTypes.early,
  Thu: schoolPeriodScheduleTypes.lab,
  Fri: schoolPeriodScheduleTypes.normal,
  Sat: schoolPeriodScheduleTypes.normal,
  Sun: schoolPeriodScheduleTypes.normal,
};
const areaSchedule = {
  103: {
    1: {
      staff: staff.Emmy,
      title: '9th FIT',
    },
    2: {
      staff: staff.Unknown,
      title: 'Spanish 2',
    },
    3: {
      staff: staff.Unknown,
      title: 'Spanish 2',
    },
    4: {
      staff: staff.Unknown,
      title: 'Spanish 2',
    },
    5: {
      staff: staff.Unknown,
      title: 'Spanish 1',
    },
    6: {
      staff: staff.Unknown,
    },
  },
  105: {
    1: {
      staff: staff.Lilia,
      title: 'Spanish 1',
    },
    2: {
      staff: staff.Lilia,
      title: 'Spanish 1',
    },
    3: {
      staff: staff.Lilia,
      title: 'Spanish 1',
    },
    4: {
      staff: staff.Quincy,
      title: '9th FIT',
    },
    5: {
      staff: staff.Lilia,
      title: 'Spanish 3',
    },
  },
  106: {
    1: {
      staff: staff.Bolt,
      title: 'Economics',
    },
    2: {
      staff: staff.Unknown,
      title: 'Skyline Spanish 130 & 140',
    },
    3: {
      staff: staff.Unknown,
      title: 'Skyline Spanish 130 & 140',
    },
    4: {
      staff: staff.Unknown,
      title: 'Skyline Spanish 112',
    },
    5: {
      staff: staff.Unknown,
      title: 'Skyline Spanish 122',
    },
    6: {
      staff: staff.Unknown,
      title: 'Skyline Spanish 122 / FIT',
    },
    7: {
      title: 'The forbidden math class',
    },
  },
};
