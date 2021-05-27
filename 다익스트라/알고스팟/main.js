const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const [m, n] = input[0].split(" ").map((e) => +e);
const graph = input.slice(1);

const g = Array.from(Array(n), () => Array(m).fill(0));
const d = Array.from(Array(n), () => Array(m).fill(Infinity));

for (let i = 0; i < graph.length; i++) {
  g[i] = graph[i]
    .replace(/\r/, "")
    .split("")
    .map((e) => +e);
}

const start = { r: 0, c: 0, w: 0 };
d[0][0] = 0;
const q = [];
q.push(start);

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

while (q.length) {
  const { r, c, w } = q.shift();

  for (let i = 0; i < 4; i++) {
    const nx = r + dx[i];
    const ny = c + dy[i];
    if (!checkLocation(nx, ny)) continue;
    const cost = g[nx][ny] + w;
    if (cost < d[nx][ny]) {
      q.push({ r: nx, c: ny, w: cost });
      d[nx][ny] = cost;
    }
  }
}

console.log(d);

console.log(d[n - 1][m - 1]);

function checkLocation(nx, ny) {
  return nx >= 0 && ny >= 0 && nx < n && ny < m;
}
