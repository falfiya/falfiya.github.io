/**
 * @param {() => void} fn
 */
function multiline(fn) {
   const s = fn.toString();
   const commentOpen = s.indexOf("/*");
   const commentClose = s.indexOf("*/");
   return s.slice(commentOpen + 2, commentClose);
}
