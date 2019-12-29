const _ = require("./propsy.js");

const my_object = {
   a: {
      b: {
         c: 1,
      },
      d: v => v * 3,
   },
};

const my_other_object = {
   a: {
      b: {
         c: 2,
      },
      d: v => v * 4,
   },
};

[my_object, my_other_object].map(new _.a.b.c); //> [1, 2]
[my_object, my_other_object].map(new _.a.d(2)); //> [6, 8]
