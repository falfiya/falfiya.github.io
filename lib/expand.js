Object.assign(window, {
  get maybe() {
    return Math.random() > 0.5;
  }
});
Object.assign(console, {
  get d() {
    console.log('ding!');
  }
})