const request = require('request');

var cookieText = 'sid=s%3A1JJZdi3LNqZdFvCVZqE6a5q0wSbyIWmv.8TN4RJ3ixYkdVovCmY8T28dPYW5q%2FyJkffz7%2Bqec07A';
var options = {
  url: 'https://connect.monstercat.com/api/release/59af1248a3d16807cba8a6e0/download?method=download&type=mp3',
  headers: {
   'User-Agent': 'request',
   'host': 'localhost:3000',
   'cookie': cookieText
  }
};
request(options, function(error, response, body) {
    console.log(response);
});