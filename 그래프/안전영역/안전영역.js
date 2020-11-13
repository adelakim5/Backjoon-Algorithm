const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
const originMap = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let rain = 0;
let maxRain = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (maxRain < originMap[i][j]) maxRain = originMap[i][j];
  }
}
let map = [];
let ans = -1;

while (rain < maxRain) {
  map = originMap.slice().map((e) => e.slice());
  sink();
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j)) cnt++;
    }
  }
  if (cnt > ans) ans = cnt;
  rain++;
}

console.log(ans);

function sink() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] <= rain) map[i][j] = -1;
    }
  }
}

function dfs(x, y) {
  if (x < 0 || y < 0 || x >= n || y >= n) return false;
  if (map[x][y] !== -1) {
    map[x][y] = -1;
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
    return true;
  }
  return false;
}
