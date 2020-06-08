class RAFDebounce {
   constructor(fn) {
      this.fn = fn;
      this.queued = false;
   }

   frame(timestamp) {
      this.fn(timestamp, this.args);
      this.queued = false;
      this.args = null;
   }

   run(...args) {
      this.args = args;
      if (!this.queued) {
         window.requestAnimationFrame(this.frame.bind(this));
         this.queued = true;
      }
   }
}
