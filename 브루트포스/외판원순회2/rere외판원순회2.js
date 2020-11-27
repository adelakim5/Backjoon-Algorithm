const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const cities = input.slice(1).map((e) => e.split(" ").map((i) => +i));
const visit = Array(n).fill(false);
let min = Infinity;

for (let i = 0; i < n; i++) {
  let start = i;
  travel(start, i, 0, 0);
}

console.log(min);

function travel(start, next, sum, visitCnt) {
  if (visitCnt === n && start === next) {
    min = Math.min(min, sum);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (!visit[next] && cities[next][i] > 0) {
      visit[next] = true;
      if (sum + cities[next][i] < min) {
        travel(start, i, sum + cities[next][i], visitCnt + 1);
      }
      visit[next] = false;
    }
  }
}
