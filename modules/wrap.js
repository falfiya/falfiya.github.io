module.exports = fn => (...a) => () => fn(...a);
// wrap a function, I mean, what else?
