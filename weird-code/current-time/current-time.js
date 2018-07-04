// By default the currentTime.js polls the currentTime of the element every half second
class CurrentTime {
  constructor(element, ms = 500) {
    this.el = element;
    this.fns = {};
    this.pollingRate = ms;
    this.pollingRateSeconds = ms / 1000;
    this.previousTime = -this.pollingRateSeconds;
    this.iid = undefined;
    this.start();
  }
  magicFunction() {
    if (this.el.currentTime === this.el.duration) {
      console.log('At the end of the song');
      this.stop();
    }
    const s = (0 | this.el.currentTime / this.pollingRateSeconds) * this.pollingRateSeconds;
    if (this.previousTime !== s) {
      if (s - this.previousTime > this.pollingRateSeconds) {
        // console.warn(`Skipping happened between ${this.previousTime} and ${s}`);
        // console.info(`Missed events at ${this.getWholeNumbersBetween(s).join(' and ')}`);
        this.getWholeNumbersBetween(s).forEach(this.run, this);
      }
      // console.log(s);
      this.run(s);
      this.previousTime = s;
      // run code
    } else {
      console.error(`What the!? Repeated ${s}??!`);
    }
  }
  push(seconds, fn) {
    if ((0 | seconds) !== seconds) {
      throw new Error('Seconds must be a whole number!');
    } else {
      this.fns[seconds] = fn;
    }
  }
  start() {
    if (this.iid !== null) {
      this.iid = setInterval(this.magicFunction.bind(this), this.pollingRate);
    } else {
      console.error('Uhhh yeah. Don\'t do that');
    }
  }
  stop() {
    if (this.iid === null) {
      console.warn('No interval to clear!');
    } else {
      console.warn(`Stopping polling.\nclearInterval(${this.iid});`);
      clearInterval(this.iid);
      this.iid = null;
    }
  }
  getWholeNumbersBetween(h) {
    return new Array(Math.ceil(h) - Math.ceil(this.previousTime)).fill(Math.ceil(this.previousTime)).map((v, i) => v + i);
  }
  run(sec) {
    if (this.fns[sec]) {
      this.fns[sec](this.el);
    }
  }
}
