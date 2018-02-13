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
    role: 'GoGuardian enforcer and salt dispenser',
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
    role: 'English Teacher & Other Stuff',
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
}
*/

const areaData = {
  '1A': {
    type: 0,
    staff: staff.Mizel,
    desc: "Unspirited warning: Melissa's @d.tech ahead",
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
    desc: "Dr. Little's @d.tech",
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
    desc: 'One does not simply walk into Morodor',
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
    desc: "It's the chemestry room; a room for chemestry",
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
    desc: 'Rye are these puns so bad?',
  },
  229: {
    type: 1,
    staff: null,
    desc: 'The phyisics room: now with walls!',
  },
  230: {
    type: 1,
    staff: staff.Lessley,
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
