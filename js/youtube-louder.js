function louder(n) {
   const videoElement = document.querySelector("video");
   const audioCtx = new AudioContext;
   const source = audioCtx.createMediaElementSource(videoElement);
   const gainNode = audioCtx.createGain();
   gainNode.gain.value = n;
   source.connect(gainNode);
   gainNode.connect(audioCtx.destination);
}
