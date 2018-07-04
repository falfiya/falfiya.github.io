const intersession = false;
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
    composition: 'NaCl',
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
  Carolina: {
    firstName: 'Carolina',
    lastName: 'Moroder',
    role: 'Spanish Teacher',
  },
  Christopher: {
    firstName: 'Christopher',
    lastName: 'Wall',
    role: 'Physics Teacher',
  },
  Alexis: {
    firstName: 'Alexis',
    lastName: 'Frost',
    role: 'Math Teacher',
  },
  Teri: {
    firstName: 'Teri',
    lastName: 'Hu',
    role: 'English Teacher',
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
    desc: "Christy's @d.tech; Knott a bad place to hang out. Also, the whiteboards are usually filled with math or code.",
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
    desc: '2B or not 2B, I guess the former',
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
    staff: staff.Carolina,
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
    staff: staff.Teri,
    desc: "Hu's classroom is this?",
  },
  130: {
    type: 1,
    staff: staff.Freedom,
    desc: 'Teaches math like blockchain',
  },
  132: {
    type: 1,
    staff: staff.Alexis,
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
    staff: staff.Christopher,
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
    '8:44': "School hasn't started yet.",
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
    '23:00': 'Go to sleep.',
    '1:00': 'Staying up this late is bad for your health.',
  },
  lab: {

  },
  early: {

  },
  late: 'Cole Gannon',
  wknd: {
    '24:00': "You know it's the weekend right?",
  },
};
const schoolPeriodSchedule = {
  Mon: schoolPeriodScheduleTypes.normal,
  Tue: schoolPeriodScheduleTypes.normal,
  Wed: schoolPeriodScheduleTypes.normal,
  Thu: schoolPeriodScheduleTypes.normal,
  Fri: schoolPeriodScheduleTypes.normal,
  Sat: schoolPeriodScheduleTypes.wknd,
  Sun: schoolPeriodScheduleTypes.wknd,
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
  },
  108: {
    1: {
      staff: staff.Unknown,
      title: '1D Overflow',
    },
    2: {
      staff: staff.Fannie,
      title: '9th FIT',
    },
    3: {
      staff: staff.Quincy,
      title: 'Photography',
    },
    4: {
      staff: staff.Rachel,
      title: 'English 4',
    },
    5: {
      staff: staff.Marcus,
      title: '9th & 10th FIT',
    },
    6: {
      staff: staff.Rachel,
      title: 'English 4',
    },
  },
  127: {
    1: {
      staff: staff.Wade,
      title: 'DTUSH',
    },
    2: {
      staff: staff.Unknown,
      title: 'FIT?',
    },
    3: {
      staff: staff.Wade,
      title: 'DTUSH',
    },
    4: {
      staff: staff.Wade,
      title: 'DTUSH',
    },
    5: {
      staff: staff.Wade,
      title: 'The best DTUSH class',
    },
    6: {
      staff: staff.Wade,
      title: 'DTUSH',
    },
  },
  129: {
    1: {
      staff: staff.Unknown,
      title: 'English 2',
    },
    2: {
      staff: staff.Unknown,
      title: 'English 2',
    },
    3: {
      staff: staff.Unknown,
      title: 'English 2',
    },
    4: {
      staff: staff.Fannie,
      title: '10th FIT',
    },
    5: {
      staff: staff.Unknown,
      title: 'English 2',
    },
    6: {
      staff: staff.Unknown,
      title: 'English 2',
    },
  },
  130: {
    1: {
      staff: staff.Freedom,
      title: 'Beginners Statistics',
    },
    2: {
      staff: staff.Freedom,
      title: 'Algebra 2',
    },
    3: {
      staff: staff.Freedom,
      title: 'Algebra 2',
    },
    4: {
      staff: staff.Freedom,
      title: 'Algebra 2',
    },
    5: {
      staff: staff.Unknown,
      title: '9th FIT',
    },
    6: {
      staff: staff.Freedom,
      title: 'Algebra 2',
    },
  },
  132: {
    1: {
      staff: staff.Alexis,
      title: 'Geometry',
    },
    2: {
      staff: staff.Alexis,
      title: 'Geometry',
    },
    3: {
      staff: staff.Alexis,
      title: 'Algebra 1',
    },
    4: {
      staff: staff.Alexis,
      title: 'Algebra 1',
    },
    5: {
      staff: staff.Unknown,
      title: '9th FIT',
    },
    6: {
      staff: staff.Alexis,
      title: 'Algebra 1',
    },
  },
  203: {
    2: {
      staff: staff.Unknown,
    },
    3: {

    },
    4: {

    },
    6: {
      staff: staff.Fannie,
      title: 'Enviornmental Science',
    },
  },
  205: {
    1: {
      staff: staff.Mathew,
      title: 'Pre-Calculus',
    },
    2: {
      staff: staff.Mathew,
      title: 'Geometry',
    },
    3: {
      staff: staff.Mathew,
      title: 'Geometry',
    },
    4: {
      staff: staff.Mathew,
      title: 'Geometry',
    },
    5: {
      staff: staff.Mathew,
      title: 'Geometry',
    },
  },
  206: {
    1: {
      staff: staff.Patrick,
      title: 'English 1',
    },
    2: {
      staff: staff.Patrick,
      title: 'English 1',
    },
    3: {
      staff: staff.Patrick,
      title: 'English 1',
    },
    4: {
      staff: staff.Patrick,
      title: 'English 1',
    },
    5: {
      staff: staff.Ken,
      title: '10th FIT',
    },
    6: {
      staff: staff.Patrick,
      title: 'English 1',
    },
  },
  208: {
    1: {
      staff: staff.Kirstie,
      title: 'World History',
    },
    2: {
      staff: staff.Kirstie,
      title: 'World History',
    },
    3: {
      staff: staff.Kirstie,
      title: 'World History',
    },
    4: {
      staff: staff.Kirstie,
      title: 'World History',
    },
    6: {
      staff: staff.Kirstie,
      title: 'World History',
    },
  },
  227: {
    1: {
      staff: staff.David,
      title: 'Calculus',
    },
    3: {
      staff: staff.David,
      title: 'Advanced Statistics',
    },
    4: {
      staff: staff.David,
      title: 'Geometry',
    },
    5: {
      staff: staff.David,
      title: 'Advanced Statistics',
    },
    6: {
      staff: staff.David,
      title: 'Calculus',
    },
  },
  229: {
    1: {
      staff: staff.Unknown,
      title: 'Physics',
    },
    2: {
      staff: staff.Unknown,
      title: 'Physics',
    },
    3: {
      staff: staff.Unknown,
      title: 'Physics',
    },
    4: {
      staff: staff.Unknown,
      title: 'Physics',
    },
    5: {
      staff: staff.Unknown,
      title: 'Physics',
    },
    6: {
      staff: staff.Unknown,
      title: 'Physics',
    },
  },
  230: {
    1: {
      staff: staff.Lessley,
      title: 'English Three',
    },
    2: {
      staff: staff.Lessley,
      title: 'English Three',
    },
    3: {
      staff: staff.Lessley,
      title: 'English Three',
    },
    5: {
      staff: staff.Lessley,
      title: 'WW?',
    },
    6: {
      staff: staff.Ian,
      title: 'FIT',
    },
  },
  232: {
    1: {
      staff: staff.Nathan,
      title: 'English 3',
    },
    2: {
      staff: staff.Nathan,
      title: 'English 3',
    },
    3: {
      staff: staff.Nathan,
      title: 'English 3',
    },
    4: {
      staff: staff.Marcus,
      title: 'FIT',
    },
    5: {
      staff: staff.Nathan,
      title: 'English 4',
    },
    6: {
      staff: staff.Nathan,
      title: 'English 4',
    },
  },
  214: {
    1: {
      staff: staff.Galen,
      title: 'Studio Time',
      // At the time of writing this, studio time doesn't even exist.
    },
  },
  114: {
    1: {
      staff: staff.Wayne,
      title: 'Studio Time',
    },
    2: {
      staff: staff.Wayne,
      title: 'Engineering',
    },
    3: {
      staff: staff.Wayne,
      title: 'Studio Time',
    },
    4: {
      staff: staff.Wayne,
      title: 'Engineering',
    },
    5: {
      staff: staff.Wayne,
      title: 'Engineering',
    },
    6: {
      staff: staff.Wayne,
      title: 'Robotics',
    },
  },
  120: {
    1: {
      staff: staff.Unknown,
      title: '9th FIT',
    },
    2: {
      staff: staff.Greg,
      title: 'Chemestry',
    },
    3: {
      staff: staff.Greg,
      title: 'Chemestry',
    },
    4: {
      staff: staff.Greg,
      title: 'Chemestry',
    },
    5: {
      staff: staff.Greg,
      title: 'Chemestry',
    },
    6: {
      staff: staff.Greg,
      title: 'Chemestry',
    },
  },
  220: {
    1: {
      staff: staff.Neal,
      title: 'Biology',
    },
    2: {
      staff: staff.Neal,
      title: 'Biology',
    },
    3: {
      staff: staff.Christy,
      title: '9th FIT',
    },
    4: {
      staff: staff.Neal,
      title: 'Biology',
    },
    5: {
      staff: staff.Neal,
      title: 'Biology',
    },
    6: {
      staff: staff.Neal,
      title: 'Biology',
    },
  },
  '1D': {
    1: {
      staff: staff.Fannie,
      title: 'FIT (Probably)',
    },
  },
  '1B': {
    6: {
      staff: staff.Unknown,
      title: 'FIT independant time',
    },
  },
  '2F': {
    5: {
      staff: staff.Melissa,
      title: 'FIT',
    },
  },
};
