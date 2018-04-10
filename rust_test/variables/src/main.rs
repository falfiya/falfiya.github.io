fn bool_maker() -> bool { true }
fn bool_maker_maker() -> fn() -> bool { bool_maker }
fn bool_maker_maker_maker() -> fn() -> fn() -> bool { bool_maker_maker }
fn main() {
  println!("{}", bool_maker_maker_maker()()());
}
