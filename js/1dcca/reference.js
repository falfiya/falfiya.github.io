module.exports
   = (rule, length) =>
      state =>
         new Array(length)
            .fill(0)
            .reduce(
               (a, v, i) =>
                  (a << 1) + (
                     i === 0
                        ? rule >> ((state << 2 & 7) + (state >> (length - 2))) & 1
                        : i < length - 1
                           ? rule >> (state >> (length - 2 - i) & 7) & 1
                           : rule >> ((state << 1 & 7) + (state >> (length - 1))) & 1
                  ),
               0,
            );
