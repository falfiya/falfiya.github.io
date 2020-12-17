// https://stackoverflow.com/a/56766138
// This is not my code, this is copyright someone on stackoverflow
// or a few people. Anyways, it's very nice :)
// this is really really clever
// some compilers have a variable that is the entire declaration of the function
// in string form. by removing the compiler dependent prefix and suffix from
// that string, you're just left with the template variable T. Well done.
#ifndef __type_name_cxx__
#define __type_name_cxx__
#include <string_view>

template <typename T>
constexpr auto type_name() noexcept {
  std::string_view name = "Error: unsupported compiler", prefix, suffix;
#ifdef __clang__
  name = __PRETTY_FUNCTION__;
  prefix = "auto type_name() [T = ";
  suffix = "]";
#elif defined(__GNUC__)
  name = __PRETTY_FUNCTION__;
  prefix = "constexpr auto type_name() [with T = ";
  suffix = "]";
#elif defined(_MSC_VER)
  name = __FUNCSIG__;
  prefix = "auto __cdecl type_name<";
  suffix = ">(void) noexcept";
#endif
  name.remove_prefix(prefix.size());
  name.remove_suffix(suffix.size());
  return name;
}
#endif
