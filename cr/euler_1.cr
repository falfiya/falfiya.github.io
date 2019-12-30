if ARGV.size != 1
  puts "#{PROGRAM_NAME} n"
  puts "Where n is a natrual number."
  puts "Computes the sum of all natrual numbers below n."
  exit 1
end
i = ARGV[0].to_i
sum = 0_u32

while i > 0
  i -= 1
  if i % 3 == 0 || i % 5 == 0
    sum += i
  end
end
puts sum
