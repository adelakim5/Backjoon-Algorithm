const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
const picture = input.slice(1).map((e) => e.split(""));
// console.log(picture);
let visit = Array.from(Array(n), () => Array(n).fill(false));
let visitColorBlind = Array.from(Array(n), () => Array(n).fill(false));
let count = 0;
let countColorBlind = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const color = picture[i][j];
    if (dfs(i, j, color, true, visit)) count++;
    if (dfs(i, j, color, false, visitColorBlind)) countColorBlind++;
  }
}

console.log(count + " " + countColorBlind);

function dfs(x, y, color, isNotColorBlind, visit) {
  if (x < 0 || y < 0 || x >= n || y >= n) return false;
  if (color === "B" && picture[x][y] !== "B") return false;
  if (isNotColorBlind) {
    if (color === "R" && picture[x][y] !== "R") return false;
    if (color === "G" && picture[x][y] !== "G") return false;
  } else {
    if (color !== "B" && picture[x][y] === "B") return false;
  }
  if (!visit[x][y]) {
    visit[x][y] = true;
    dfs(x + 1, y, color, isNotColorBlind, visit);
    dfs(x - 1, y, color, isNotColorBlind, visit);
    dfs(x, y + 1, color, isNotColorBlind, visit);
    dfs(x, y - 1, color, isNotColorBlind, visit);
    return true;
  }
  return false;
}
