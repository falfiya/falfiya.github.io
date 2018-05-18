const C = (cls) => {
  const c = function (...a) {
    return new cls(...a);
  };
  Object.setPrototypeOf(c, {
    get literal() {
      return cls;
    },
  });
  c.displayName = cls.name;
  return c;
};
