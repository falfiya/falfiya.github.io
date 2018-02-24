const x = new Proxy(function (){}, {
  get(o, k) {
    if(k === Symbol.toPrimitive) {
      return hint => {
        switch(hint) {
          case 'number': 
            console.log('Atempted to coerse this to a number');
            break;
          case 'string':
            console.log('You called this using `${this}`');
            break;
          default:
            console.log('Received a default hint');
        }
      };
  } 
      console.log(`You called this using this[${k}]`);
    
  },
  set(o, k, v) {
    console.log(`You called this using this[${k}] = ${v}`);
  },
  apply(f, t, a) {
    if (a[0].raw) {
      const T = a.slice(1);
      const s = a[0];
      console.log(`You called this using this\`${  s.map((v, i) => v + (T[i] ? '${' + T[i] + '}' : '')).join``  }\``);
    } else {
      console.log('You called this using this(args)');
      console.log(a);
    }
  },
  construct(t, a) {
    console.log(`You called this using new this(${a})`);
    return this;
  },
  has(t, v) {
    console.log(`You called this using ${v} in this`);
  },
  deleteProperty(t, v) {
    console.log(`You called this using delete this[${v}]`);
  },
});
