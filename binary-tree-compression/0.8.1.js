function binaryTreeCompression(string) {
  const tree = [];
  const done = {};
  let pass;
  string.split``.forEach((chara) => {
    if (!done[chara]) {
      const occ = string.match(new RegExp(chara, 'g')).length;
      if (tree[occ]) {
        tree[occ].push(chara);
        done[chara] = 1;
      } else {
        tree[occ] = [chara];
        done[chara] = 1;
      }
    }
  });
  for (let keydex = 0; Object.keys(tree).length > 1 && !pass;) {
    const index = +Object.keys(tree)[keydex];
    if (pass) {
      tree[pass.index + index] = [tree[index], pass.value];
      pass = 0;
    }
    if (Object.keys(tree[index]).length > 1) {
      const pair = [tree[index].shift(), tree[index].shift()];
      if (tree[index * 2]) {
        tree[index * 2].push(pair);
      } else {
        tree[index * 2] = [pair];
      }
    } else {
      if (tree[index][0]) {
        pass = {
          index,
          value: tree[index][0],
        };
      }
      delete tree[index];
      keydex++;
    }
  }
  return tree[Object.keys(tree)[0]];
}
