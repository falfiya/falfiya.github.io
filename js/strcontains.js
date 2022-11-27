const Benchmark = require("benchmark");
var suite = new Benchmark.Suite;
const example = "The quick brown fox jumps over the lazy dog.";

suite.add("RegExp#test", () => {
   /y/.test(example);
})
.add("String#indexOf", () => {
   example.indexOf('y') > -1;
})
.add("String#includes", () => {
   example.includes('o');
})
.on('cycle', function(event) {
   console.log(String(event.target));
})
.on('complete', function() {
   console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
