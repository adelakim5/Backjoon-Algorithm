const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map((e) => +e);
let [r, c, d] = input[1].split(" ").map((e) => +e);
const map = [];
for (let i = 2; i < input.length; i++) {
  map.push(input[i].split(" ").map((e) => +e));
}

const visited = Array.from(Array(n), () => Array(m).fill(false));
visited[r][c] = true;
let cnt = 1;
const stack = [];
stack.push([r, c, d]);
dfs();
console.log(cnt);

function insertStack(dy, dx, ds, [r, c]) {
  let flag = true;
  for (let i = 0; i < 4; i++) {
    const nr = dy[i] + r;
    const nc = dx[i] + c;
    if (nr < 0 || nc < 0 || nr >= n || nc >= m || visited[nr][nc] || map[nr][nc]) continue;
    visited[nr][nc] = true;
    flag = false;
    cnt++;
    stack.push([nr, nc, ds[i]]);
    break;
  }
  return flag;
}

function dfs() {
  while (stack.length) {
    const [r, c, d] = stack.pop();
    if (d === 0) {
      const dx = [-1, 0, 1, 0];
      const dy = [0, 1, 0, -1];
      const ds = [3, 2, 1, 0];
      const flag = insertStack(dy, dx, ds, [r, c]);

      if (flag && r + 1 < n && map[r + 1][c] === 0) stack.push([r + 1, c, d]);
    } else if (d === 3) {
      // west
      const dx = [0, 1, 0, -1];
      const dy = [1, 0, -1, 0];
      const ds = [2, 1, 0, 3];
      const flag = insertStack(dy, dx, ds, [r, c]);
      if (flag && c + 1 < m && map[r][c + 1] === 0) stack.push([r, c + 1, d]);
    } else if (d === 2) {
      // south
      const dx = [1, 0, -1, 0];
      const dy = [0, -1, 0, 1];
      const ds = [1, 0, 3, 2];
      const flag = insertStack(dy, dx, ds, [r, c]);
      if (flag && r - 1 >= 0 && map[r - 1][c] === 0) stack.push([r - 1, c, d]);
    } else if (d === 1) {
      // east
      const dx = [0, -1, 0, 1];
      const dy = [-1, 0, 1, 0];
      const ds = [0, 3, 2, 1];
      const flag = insertStack(dy, dx, ds, [r, c]);
      if (flag && c - 1 >= 0 && map[r][c - 1] === 0) stack.push([r, c - 1, d]);
    }
  }
}
