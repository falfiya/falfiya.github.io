# Here's some general rules on how to name folders and files

### Folders
1. kebab-case
2. camelCase
3. PascalCase
4. snake_case
Exceptions to this rule are folders that contain Ruby or Rust. Those folders should *always* use `snake_case`

### Files
* `.min.js` files do not get linted by the `coalpha.github.io` repo's `.eslintrc`
* Version numbers should look like this: `0.0.0.*`
* JavaScript files should always use either `camelCase` or `kebab-case` (he says while typing "JavaScript" in `PascalCase`) if the file is meant to be used as a module, always use `camelCase`.
