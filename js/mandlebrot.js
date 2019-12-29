// Not my code, taken from the wrenlang website
for (let yPixel = 0; yPixel <= 24; ++yPixel) {
   let y = yPixel / 12 - 1;
   for (let xPixel = 0; xPixel <= 80; ++xPixel) {
      let x = xPixel / 30 - 2;
      let x0 = x;
      let y0 = y;
      let iter = 0;
      while (iter < 11 && x0 * x0 + y0 * y0 <= 4) {
         const x1 = (x0 * x0) - (y0 * y0) + x;
         const y1 = 2 * x0 * y0 + y;
         x0 = x1;
         y0 = y1;
         iter += 1;
      }
      process.stdout.write(" .-:;+=xX$& "[iter]);
   }
   process.stdout.write("\n");
}
