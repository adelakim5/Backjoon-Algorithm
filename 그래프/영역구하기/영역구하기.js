const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [m, n, k] = input[0].split(" ").map((e) => +e);
const coords = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let map = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
for (let i = 0; i <= n; i++) {
  map[0][i] = -1;
}
for (let j = 0; j <= m; j++) {
  map[j][n] = -1;
}

let [minX, minY, maxX, maxY] = [0, 0, 0, 0];

for (let coord of coords) {
  let [leftX, leftY, rightX, rightY] = coord;
  let [nLeftX, nleftY] = [m - leftY, leftX];
  let [nRightX, nRightY] = [m + 1 - rightY, rightX - 1];
  [minX, minY, maxX, maxY] = [nRightX, nleftY, nLeftX, nRightY];
  //   dfs(nLeftX, nleftY);
  //   dfs(nRightX, nRightY);
  erase();
}

// let [minX, minY, maxX, maxY] = [0, 0, m, n];
let partLen = 0;
let res = [];
for (let i = 0; i <= m; i++) {
  for (let j = 0; j <= n; j++) {
    if (map[i][j] === 0) {
      res.push(count(i, j));
      partLen++;
    }
  }
}

function erase() {
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (map[i][j] !== -1) map[i][j] = -1;
    }
  }
}

console.log(partLen + "\n" + res.sort((a, b) => a - b).join(" "));

function count(x, y) {
  let q = [];
  q.push([x, y]);
  let cnt = 1;
  map[x][y] = 2;
  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];
  while (q.length) {
    let [qx, qy] = q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = qx + dx[i];
      const ny = qy + dy[i];
      if (isInPart(nx, ny) && map[nx][ny] === 0) {
        map[nx][ny] = 2;
        cnt++;
        q.push([nx, ny]);
      }
    }
  }
  return cnt;
}

// console.log(map);

// function dfs(x, y) {
//   if (!isInPart(x, y)) return false;
//   if (map[x][y] !== -1) {
//     map[x][y] = -1;
//     dfs(x + 1, y);
//     dfs(x - 1, y);
//     dfs(x, y + 1);
//     dfs(x, y - 1);
//     return true;
//   }
//   return false;
// }

function isInPart(nx, ny) {
  if (nx > 0 && ny >= 0 && nx <= m && ny <= n) return true;
  return false;
}
