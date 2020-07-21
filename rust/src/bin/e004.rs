/*
   A palindromic number reads the same both ways. The largest palindrome made
   from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest
   palindrome made from the product of two 3-digit numbers.
*/

fn is_palindrome(i: u32) -> bool {
   let s = i.to_string();
   return s == s.chars().rev().collect::<String>();
}

fn main() {
   let mut a: [u32; 999 * 999] = [];
}
