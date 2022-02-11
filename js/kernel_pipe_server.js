const net = require("net");

const pipe = "\\\\.\\pipe\\coalpha";

const upstream = net.createServer(socket => {
   socket.write("Hello, World!\n");
   socket.write("DONE");
   socket.end();
});

upstream.listen(pipe);
