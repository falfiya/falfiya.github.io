
> coalpha.github.io@1.0.0 build /mnt/c/Users/coalh/Desktop/coalpha.github.io
> babel --plugins syntax-function-bind "porxy.js"

const i = document.getElementById('i');
function writeHTML(url) {
  fetch('https://cors-anywhere.herokuapp.com/' + url).then(_ => _.text()).then(_ => encodeURI(_)).then(_ => {
    i.innerHTML = _;
    i.onbeforeunload = e => {
      console.log(document.activeElement.href);
      writeHTML(document.activeElement.href);
      return 'Stahp';
    };
  });
}
writeHTML(prompt('URL'));

