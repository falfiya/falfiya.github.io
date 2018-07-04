function delay(ms) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/query?ms=${ms}&time=${new Date().getTime()}`, false);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}
// delay = (m, x = new XMLHttpRequest()) => (x.open('GET', `/query/?ms=${m}&time=${new Date().getTime()}`, false), x.send());
