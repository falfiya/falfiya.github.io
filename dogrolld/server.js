const express = require('express');

const port = 3000;
const app = express();
app.use(express.static('.'));
app.get('/', (req, res) => {
  res.redirect('/index.html');
});
app.listen(port, () => {
  console.log(`We're up and running on port ${port}`);
});
