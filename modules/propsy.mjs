const _ = new Proxy(Object.create(null), {
  get(ob, ik) {
    const op = [[0, ik]];
    const p = new Proxy(class c {}, {
      get(o, k) {
        if (k === '_') {
          return o => op.reduce((A, v, i) => {
            if (v[0] === 0) {
              return A[v[1]];
            }
            if (v[0] === 1) {
              return A(...v[1]);
            }
            return new A(...v[i]);
          }, o);
        }
        op.push([0, k]);
        return p;
      },
      apply(f, ths, args) {
        op.push([1, args]);
        return p;
      },
      construct(o, args) {
        op.push([2, args]);
        return p;
      },
    });
    return p;
  },
});
