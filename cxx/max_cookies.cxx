constexpr size_t max_cookies_v0(size_t idx, size_t jars[idx]) noexcept {
   while (idx --> 0) {
      size_t const self{jars[idx] + jars[idx + 2]};
      size_t const next{jars[idx + 1]};
      jars[idx] = self > next ? self : next;
   }
   return *jars;
}

constexpr size_t example() noexcept {
   size_t *jars{new size_t[8]{5, 30, 99, 60, 5, 10, 0, 0}};
   return max_cookies_v0(6, jars);
}

int main() noexcept {
   size_t 
}
