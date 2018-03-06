const express = require('express');

const port = 3000;
const app = express();
app.use(express.static('.'));
app.get('/', (req, res) => {
  res.redirect('/index.txt');
});
app.get('/query', (req, res) => {
  const delay = new Date().getTime() - req.query.time;
  // This shouldn't be negative, like, ever
  console.log(delay);
  const waitms = req.query.ms - (delay * 2);
  if (waitms <= 500) {
    // It's a reverse arrow function
    res.send('Sent it back instantly');
  } else {
    setTimeout(() => res.send(`Waited ${waitms}ms`), waitms);
  }
});
app.listen(port, () => {
  console.log(`We're up and running on port ${port}`);
});
// I was gonna minify this but then I realized that I didn't care
