const fetch = require('node-fetch');

const url = 'https://connect.monstercat.com/signin';
const data = {
  username: 'mluebke19@dtechhs.org',
  password: '**************',
};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
}).then(res => res.headers)
  .catch(error => console.error('Error:', error))
  .then(res => res.get('set-cookie'));
