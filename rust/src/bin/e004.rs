/*
   A palindromic number reads the same both ways. The largest palindrome made
   from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest
   palindrome made from the product of two 3-digit numbers.
*/

fn is_palindrome(i: u32) -> bool {
   let s = i.to_string();
   return s == s.chars().rev().collect::<String>();
}

fn three_d_iter() -> impl Iterator<Item = u32> {
   return (100u32..999).rev();
}

fn main() {
   let mut longest = 0u32;
   let mut l_a = 0u32;
   let mut l_b = 0u32;
   three_d_iter().for_each(|a| {
      three_d_iter().for_each(|b| {
         let c = a * b;
         if is_palindrome(c) && c > longest {
            longest = c;
            l_a = a;
            l_b = b;
         }
      });
   });
   println!("{} * {} = {}", l_a, l_b, longest);
}
