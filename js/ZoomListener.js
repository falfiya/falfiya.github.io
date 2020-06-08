// compiled from based-canvas/src/ZoomListener.ts
class ZoomListener {
   constructor(fn) {
      this.fn = fn;
      this.dpr = window.devicePixelRatio;
      this.queued = false;
      window.addEventListener("resize", this.resize.bind(this));
   }
   resize() {
      if (!this.queued) {
         window.requestAnimationFrame(this.dispatch.bind(this));
         this.queued = true;
      }
   }
   dispatch() {
      const dpr = window.devicePixelRatio;
      if (dpr !== this.dpr) {
         this.fn(dpr);
         this.dpr = dpr;
      }
      this.queued = false;
   }
}

new ZoomListener(() => console.log("zoom"));
