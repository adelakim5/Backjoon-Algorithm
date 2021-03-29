const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const [m, n] = input[0].split(" ").map((e) => +e);
const g = input.slice(1).map((e) => e.split(" ").map((i) => +i));

let head = 0;
let tail = 0;
const q = [];
let unripenTomatoesCnt = 0;
const push = (value) => (q[tail++] = value);

const size = () => tail - head;
const shift = () => q[head++];

const checkTomatoStatus = () => {
  const ripenTomatoes = [];
  let unripenTomatoesCnt = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 1) push({ i, j, t: 0 });
      if (g[i][j] === 0) unripenTomatoesCnt++;
    }
  }
};

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const bfs = () => {
  let time = -1;
  const visited = Array.from(Array(m), () => Array(n).fill(false));
  checkTomatoStatus();
  q.forEach((e) => {
    const { i, j } = e;
    visited[i][j] = true;
  });

  while (size()) {
    const { i, j, t } = shift();
    time = t;
    for (let idx = 0; idx < 4; idx++) {
      const nx = dx[idx] + i;
      const ny = dy[idx] + j;
      if (nx >= 0 && ny >= 0 && nx < n && ny < m && visited[nx][ny] === false && g[nx][ny] === 0) {
        visited[nx][ny] = true;
        g[nx][ny] = 1;
        ripeningTomatoesCnt++;
        q.push({ i: nx, j: ny, t: t + 1 });
      }
    }
  }
  return ripeningTomatoesCnt === unripenTomatoesCnt ? time : -1;
};

console.log(bfs());
