const fs = require('fs');
const R = require('ramda');
const sharp = require('sharp');

const resizeImage = (path, out, width, height) => {
  sharp(path)
    .resize(width, height)
    .toFile(out, console.error);
};

// ** functions.js
const list = R.unapply(R.identity);
const mapIndexed = R.addIndex(R.map);
const reverseSubArrays = R.map(R.reverse);
const keyToVal = R.pipe(R.toPairs, reverseSubArrays, R.fromPairs);
const boolCond = cond => R.ifElse(cond, R.T, R.F);
const boolCondFn = cond => R.compose(R.always, R.ifElse(cond, R.T, R.F));
const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat);
const whenWhen = R.curry((cond, val0, fn, val1) => R.when(boolCondFn(cond)(val0), fn)(val1));
const boolMatch = R.curry((str, tststr) => (new RegExp(str)).test(tststr));
// **
const readFile = R.curry(fs.readFileSync)(R.__, 'utf8');
const readJSON = R.pipe(readFile, JSON.parse);
const writeFile = R.curry(fs.writeFileSync)(R.__, R.__, 'utf8');
const splitNewline = R.split('\n');
const readSplitNewline = R.pipe(readFile, splitNewline);

const inputDIR = 'input/';
const options = readJSON('options.json');
const firstName = readSplitNewline(`${inputDIR}first-name.txt`);
const lastName = readSplitNewline(`${inputDIR}last-name.txt`);
const id = readSplitNewline(`${inputDIR}id.txt`);
const ary = id.map((id, indx) => ({
  name: (`${firstName[indx]} ${lastName[indx]}`).toLowerCase(),
  lastName: lastName[indx],
  id,
}));
const photosDIR = 'input/photos/';
const fileNames = fs.readdirSync(photosDIR);
const findFileNames = R.find(R.__, fileNames.map(file => file.toLowerCase()));
const testAllFileNamesForMatch = str => findFileNames(boolMatch(str));
const fileNameToStudent;
console.log(fileNames);
// writeFile('output.json', JSON.stringify(fileNameToStudent));
fileNames.forEach((file) => {
  const student = fileNameToStudent[file]
  resizeImage(photosDIR + file, `output/photos/${student.name} ${student.id}`, 300);
});
