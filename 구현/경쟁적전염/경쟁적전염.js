const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map((e) => +e);
let labs = input.slice(1, n + 1).map((e) => e.split(" ").map((i) => +i));
const [s, x, y] = input[n + 1].split(" ").map((e) => +e);

if (!s) {
  console.log(labs[x - 1][y - 1]);
  return;
}

let visit = Array.from(Array(n), () => Array(n).fill(false));
console.log(bfs(x, y, s));

function initQ() {
  let q = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!labs[i][j]) continue;
      q.push({ x: i, y: j, value: labs[i][j], time: 0 });
      visit[i][j] = true;
    }
  }
  q.sort((a, b) => a.value - b.value);
  return q;
}

function bfs(x, y, s) {
  let q = initQ();
  while (q.length) {
    const past = q.shift();
    if (past.time + 1 > s) break;
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    for (let i = 0; i < 4; i++) {
      const nx = past.x + dx[i];
      const ny = past.y + dy[i];
      if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
        if (!visit[nx][ny] && !labs[nx][ny]) {
          visit[nx][ny] = true;
          labs[nx][ny] = past.value;
          q.push({ x: nx, y: ny, value: past.value, time: past.time + 1 });
        }
      }
    }
  }
  return labs[x - 1][y - 1];
}
