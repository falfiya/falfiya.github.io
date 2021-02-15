enum hello_world {val = "hello world"};

function puts(v: typeof hello_world) {
   console.log(v.val);
}

puts(hello_world);
