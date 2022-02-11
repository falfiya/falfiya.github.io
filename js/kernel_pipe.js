const child_process = require("child_process");

child_process.spawn("node", [`${__dirname}/kernel_pipe_server`]);
child_process.spawn("node", [`${__dirname}/kernel_pipe_client`]);
