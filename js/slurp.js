module.exports = function slurp(stream) {
  stream.resume();
  return new Promise((res, rej) => {
    stream.on("error", rej);
    stream.on("end", () => res(stream.read()));
  });
}
