const { spawn } = require("child_process");
const py = spawn("python", ["py.py"]);

py.stdout.on("data", (data) => {
  console.log(`interop.py: ${data}`);
});

