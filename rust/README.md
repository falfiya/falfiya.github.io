# rust

Not really sure why this got moved out of coalpha.github.io.
I suspect it had something to do with Cargo complaining about the directory not
being the root directory when I add it in vscode.

Rust feels very heavy.
The tooling is large and feels slow.
It's got the dependency hell that NodeJS has with npm except now you have to
compile everything locally.
Since that slows down the computer, I actually have to get up and do something
else while the code's compiling.
At least with Node, once I download all 120983021938 modules,
I'm basically done waiting.
Once the code's been compiled, the large binaries feel sluggish.
Oh, did you try `--release`?
No because I just wanted to test a change I made.
One of the most annoying things for me is the fact that you can't really have a
file without a project structure.
Sure, you can have your little `hello.rs` but basically every IDE balks because
it can't find cargo.
This language doesn't feel like a good language to prototype in but I'm told
that it's one of the best languages to implement production quality code because
of it's safety guarantees.

`cargo run --bin e{n}` where `n` is the problem number.
