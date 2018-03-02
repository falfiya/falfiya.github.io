(() => {
 const d = document;
  const power = 'metaKey';
  const input = d.createElement('input');
  input.style = 'position: absolute; transform: scale(0)';
  d.body.appendChild(input);
  window.addEventListener('keydown', (key) => {
    if (key.key === 'v' && key[power]) {
      const { activeElement } = d;
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      input.focus();
      setTimeout(() => {
        const ary = activeElement.value.split``;
        ary.splice(start, 0, input.value);
        ary.splice(start + 1, end - start);
        activeElement.value = ary.join``;
        activeElement.focus();
        input.value = '';
      }, 99);
    }
  });
})();