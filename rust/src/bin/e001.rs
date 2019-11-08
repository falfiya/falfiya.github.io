/*
   If we list all the natural numbers below 10 that are multiples of 3 or 5,
   we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all
   the multiples of 3 or 5 below 1000.
*/
static MAX: u32 = 1000;

fn main() {
   let mut sum: u64 = 0;
   for n in 1..MAX {
      if n % 3 == 0 || n % 5 == 0 {
         sum += n as u64;
      }
   }
   println!("{}", sum);
}
