const chalk = require('chalk');

function promiseSuccess(v) {
  console.log(chalk.green('Success!'));
  const res = this.res.shift();
  this.rej.shift();
  if (res) {
    console.log(chalk.green('Resolving wrapped promise'));
    res(v);
  }
}
function promiseFailure(e) {
  console.log(chalk.red('Failure!'));
  const rej = this.rej.shift();
  this.res.shift();
  if (rej) {
    console.log(chalk.red('Rejecting wrapped promise'));
    rej(e);
  }
}
function next() {
  this.promise = null;
  console.log(chalk.bgMagenta.black('Set this.promise to null'));
  const fn = this.fns.shift();
  if (fn) {
    console.log(chalk.bgMagenta.black('Running the next promise in the queue'));
    this.promise = fn();
    attachListener.call(this);
  }
}
function attachListener() {
  console.log(chalk.magenta('Attaching Listeners using .then, .catch, and .finally!'));
  this.promise
    .then(promiseSuccess.bind(this))
    .catch(promiseFailure.bind(this))
    .finally(next.bind(this));
}
module.exports = class PromiseQueue {
  constructor() {
    console.log(chalk.bgYellow.black('Constructing a PromiseQueue'));
    this.fns = [];
    this.res = [];
    this.rej = [];
    this.promise = null;
  }
  push(fn) {
    console.log(chalk.bgCyan.black('Adding a function'));
    if (this.promise) {
      console.log(chalk.bgBlue.black('There is already a promise present'));
      const p = new Promise((res, rej) => {
        this.res.push(res);
        this.rej.push(rej);
      });
      this.fns.push(fn);
      console.log(chalk.bgBlue.black('Pushing res, rej, and fn to the array'));
      console.log(chalk.bgBlue.black('Returing the wrapped promise'));
      return p;
    }
    console.log(chalk.blue("There's nothing in the queue"));
    const p = fn();
    console.log(chalk.blue('Pushing empty res, rej, and fn to the array'));
    this.res.push(null);
    this.rej.push(null);
    console.log(chalk.blue('Running the function now with attachListener'));
    this.promise = p;
    attachListener.call(this);
    return p;
  }
};
