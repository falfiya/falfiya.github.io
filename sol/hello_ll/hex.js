process.stdout.write(`0x${require("fs").readFileSync(`${__dirname}/hello.bin`).toString("hex")}`);
