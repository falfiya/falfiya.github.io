const n = ['─', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼'];
function transmute(str) {
  const size = Math.ceil(Math.sqrt(str.length * 4));
  const map = Array(size).fill().map(v => []);
  const b = str.split``.map((c, i) => {
    const number = '' + str.charCodeAt(i);
    return ('0'.repeat(4 - number.length) + number).split``.map(v => n[v]).join``;
  }).join``;
  const sliceLength = -b.length % size
  return b.match(new RegExp(`.{${size}}`, 'g')).concat(sliceLength ? b.slice(sliceLength) : '').join`\n`;
}
function untransmute(str) {
  const b = str.split`\n`.join``;
  return b.match(new RegExp(`.{${4}}`, 'g')).map(v => String.fromCharCode(v.split``.map(V => n.indexOf(V)).join``)).join``;
}
