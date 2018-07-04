function get(url) {
  return new Promise(((res, rej) => {
    const r = new XMLHttpRequest();
    r.open('GET', url);
    r.onload = function () {
      if (r.status === 200) {
        res(r.response);
      } else {
        rej(Error(r.statusText));
      }
    };
    r.onerror = function () {
      rej(Error('Network Error'));
    };
    r.send();
  }));
}
