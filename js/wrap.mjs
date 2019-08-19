/**
 * @param {Function} fn
 * @returns {Function}
 */
export default fn => (...a) => () => fn(...a);
