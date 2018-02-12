const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Monstercat Password? ', (answer) => {
  console.log(`You typed: ${answer}`);
  rl.close();
});
