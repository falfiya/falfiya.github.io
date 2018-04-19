const ytdl = require('ytdl-core');
b.onclick=te;
function te() {
  Array.from(document.getElementsByTagName('a')).forEach(a=>a.parentNode.removeChild(a));
  ytdl.getInfo(t.value, {}, init);
}
function init(e, info) {
  const formats = info.formats;
  formats.forEach(format => {
    const t = `${format.container} using ${format.encoding} with quality ${format.quality} | ${format.resolution} :: audio @ ${format.audioBitrate} using ${format.audioEncoding}`;
    const a = document.createElement('a');
    a.href = format.url;
    a.innerText = t;
    document.body.appendChild(a);
  });
}
