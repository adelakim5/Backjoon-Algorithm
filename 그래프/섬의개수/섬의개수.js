const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

let n = -1;
let m = -1;
let i = 0;
let map = [];
let res = "";

while (true) {
  let [c, r] = input[i].split(" ").map((e) => +e);
  if (c === 0 && r === 0) break;
  n = r;
  m = c;
  let cnt = 0;
  map = input.slice(i + 1, i + 1 + n).map((e) => e.split(" ").map((i) => +i));
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (dfs(j, k)) {
        cnt++;
      }
    }
  }
  res += cnt + "\n";
  i += n + 1;
}

console.log(res.trim());

function dfs(x, y) {
  if (x < 0 || y < 0 || x >= n || y >= m) return false;
  if (map[x][y] === 1) {
    map[x][y] = 2;
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
    dfs(x - 1, y - 1);
    dfs(x - 1, y + 1);
    dfs(x + 1, y - 1);
    dfs(x + 1, y + 1);
    return true;
  }
  return false;
}
