// Do fourty trials where a trial is the count of how many people in a random sample of six people own a home and did not graduate highschool
const trial = () => Array(6).fill``.map(v => Math.random() < 0.238).filter(v => v).length;
const nTrials = n => Array(n).fill``.map(trial);
const res = [1, 2, 1, 0, 0, 0, 3, 1, 0, 1, 2, 2, 0, 3, 1, 3, 4, 1, 3, 0, 3, 2, 1, 1, 3, 1, 2, 0, 2, 2, 0, 3, 1, 0, 2, 1, 1, 1, 2, 2];
res.forEach((v, i) => window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Trial ${i + 1} Result ${v}`)));
