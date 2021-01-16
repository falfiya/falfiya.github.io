// Let's improve my convert money file

#include <cstdio>
#include <cstdlib>

// Cole Gannon

using str = char const *;

constexpr size_t strlen(str str) noexcept {
   size_t i{};
   while (*str++ != '\0') {
      i++;
   }
   return i;
}

inline void print(str s) noexcept {
   fwrite(s, sizeof(char), strlen(s), stdout);
}

inline char *getline() noexcept {
	static const size_t buf_size = 256;
	char *buf = new char[buf_size];
	return fgets(buf, buf_size, stdin);
}


struct Conversion {
   str to{};
   double from_usd{};
   constexpr explicit Conversion(str to, double from_usd) noexcept:
      to(to), from_usd(from_usd)
   {};
};

template <class ...Currencies>
constexpr void convert_usd_to(Currencies...currencies) noexcept {
   constexpr size_t argc{sizeof...(Currencies)};
   if constexpr (argc == 0) {
      return;
   }

   print("Convert from USD to ");

   if constexpr (argc == 1) {
      print(currencies.to...);
   } else if constexpr (argc == 2) {
      printf("%s and %s", currencies.to...);
   } else {
      size_t i{};
      char _[]{(
         printf(++i == argc ? "and %s" : "%s, ", currencies.to),
      '\0')...};
      (void) _;
   }

   print(".\n> ");
   auto line{getline()};
   auto line_len{strlen(line)};
   line[line_len - 1] = '\0';

   errno = 0;
   char *endptr;
   double usd{strtod(line, &endptr)};
   if (errno | *endptr) {
      print("Invalid input!");
      return;
   }

   char _[]{(
      printf("%6s: %10.2f\n", currencies.to, usd * currencies.from_usd),
   '\0')...};
   (void) _;
};

int main() {
   constexpr Conversion euros ("euros",  000.83);
   constexpr Conversion pounds("pounds", 008.57);
   constexpr Conversion krone ("krone",  000.11);
   constexpr Conversion jpy   ("yen",    103.84);

   convert_usd_to(euros);
   convert_usd_to(jpy, krone);
   convert_usd_to(euros, pounds, krone, jpy);
}
