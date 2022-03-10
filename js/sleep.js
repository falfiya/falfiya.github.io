process.stdout.write("Hello")
await ({then: _ => setTimeout(_, 1000)})
process.stdout.write(", World!")
