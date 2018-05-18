function download() {
  const a = document.createElement('a');
  const url = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(calculator.getState()))}`;
  a.setAttribute('href', url);
  a.setAttribute('download', 'calcuIator.json');
  document.body.appendChild(a);
  a.click();
}
function undownload() {
  const i = document.createElement('input');
  i.setAttribute('type', 'file');
  const reader = new FileReader();
  const file = i.files[0];
  i.onclick = () => {
    reader.addEventListener('load', () => {
      calculator.setState(JSON.parse(file));
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    } else {
      alert('You have to select a file (dummy)');
    }
  };
  document.body.appendChild(i);
  i.click();
}
