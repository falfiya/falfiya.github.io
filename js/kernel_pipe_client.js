const net = require("net");

const pipe = "\\\\.\\pipe\\coalpha";

const downstream = net.connect(pipe);

downstream.on("data", data => {
   const str = data.toString("utf8");
   process.stdout.write(str);
});
