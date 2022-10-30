class TimedCache {
   constructor (seconds, fn) {
      this.ms_delay = seconds * 1000;
      this.fn = fn;
      this.last_called = 0;
   }
   then(res) {
      const now = Date.now();
      if ((now - this.last_called) > this.ms_delay) {
         this.cache = this.fn();
         this.last_called = now;
      }
      res(this.cache);
   }
}

const sleep = n => ({then(res) {setTimeout(res, n * 1000)}});

const rand100 = () => (Math.random() * 100) | 0;
const random_cache = new TimedCache(3, rand100);

void async function main() {
   while (true) {
      console.log(await random_cache);
      await sleep(1);
   }
}();
