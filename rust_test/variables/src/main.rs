fn main() {
    let add1 = add(1);
    let result = add1(3);
    println!("1 plus 3 is {}", result);
}
fn add(a: u32) -> fn() {
    return fn(b: i32) -> i32 {
        return a + b;
    }
}
