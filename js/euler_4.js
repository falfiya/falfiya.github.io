// this one is slower than the python and it makes me annoyed
function isPalindrome(int) {
   const str = String(int);
   return str.split("").reverse().join("") === str;
}

function* twodigit() {
   let i = 999;
   while (i > 100) {
      yield i--;
   }
}

const q = [];

for (const a of twodigit()) {
   for (const b of twodigit()) {
      q.push(a * b);
   }
}

q.sort((a, b) => a - b).reverse();

const res = q.find(isPalindrome);

if (res) {
   console.log(res);
} else {
   console.log("guh");
}
