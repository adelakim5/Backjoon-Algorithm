//3:11 - 3:41
const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [r, c] = input[0].split(" ").map((e) => +e);
const map = input.slice(1).map((e) => e.split(""));
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let maxCount = 0;
const lands = getLands(map);
for (let land of lands) {
  const [i, j] = land;
  const visit = Array.from(Array(r), () => Array(c).fill(0));
  bfs(i, j, visit);
}
console.log(maxCount);

function getLands(map) {
  let lands = [];
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] === "L") lands.push([i, j]);
    }
  }
  return lands;
}

function bfs(x, y, visit) {
  let q = [[x, y, 0]];
  visit[x][y] = 1;
  while (q.length) {
    let [i, j, c] = q.shift();
    for (let k = 0; k < 4; k++) {
      const nx = i + dx[k];
      const ny = j + dy[k];
      if (!isInMap(nx, ny) || visit[nx][ny] || map[nx][ny] === "W") continue;
      visit[nx][ny] = c + 1;
      maxCount = maxCount < c + 1 ? c + 1 : maxCount;
      q.push([nx, ny, c + 1]);
    }
  }
}

function isInMap(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < r && ny < c) return true;
  return false;
}
