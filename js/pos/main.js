const {Client} = require("pg");
const client = new Client({
   user: "postgres",
   password: "password", // placeholder
});
client.connect();
client.query("select $1 as message", ["Hello world!"], (err, res) => {
   console.log(err ? err.stack : res.rows[0].message);
   client.end();
});
