const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let [r, c] = input[0].split(" ").map((e) => +e);
let table = input.slice(1).map((e) => e.split(" "));
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let time = 0;
let answer = 0;
let nq = [];

// function print(table) {
//   let res = "";
//   for (let i = 0; i < r; i++) {
//     for (let j = 0; j < c; j++) {
//       res += table[i][j] + " ";
//     }
//     res += "\n";
//   }
//   console.log(res);
}

while (true) {
  let visit = Array.from(Array(r), () => Array(c).fill(-1));
  dfs([0, 0], visit, nq);
  if (!nq.length) break;
  answer = getCount(table);
  melt();
  time++;
}

console.log(time + "\n" + answer);

function getCount(table) {
  let sum = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (table[i][j] === "1") sum++;
    }
  }
  return sum;
}

function melt() {
  let q = nq.slice();
  nq = [];
  while (q.length) {
    let [x, y] = q.shift();
    table[x][y] = "0";
  }
}

function dfs(start, visit, nq) {
  let [x, y] = start;
  if (table[x][y] === "1") return;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx >= 0 && ny >= 0 && nx < r && ny < c && visit[nx][ny] === -1) {
      if (table[nx][ny] === "1") {
        visit[nx][ny] = 1;
        nq.push([nx, ny]);
      } else {
        visit[nx][ny] = 0;
      }
      visit[x][y] = 0;
      dfs([nx, ny], visit, nq);
    }
  }
}
