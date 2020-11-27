const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const cities = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let totalCost = Infinity;
for (let start = 0; start < n; start++) {
  let visit = Array.from(Array(n), () => Array(n).fill(0));
  const originStart = start;
  findWay(start, [originStart], 0, visit, originStart);
}
console.log(totalCost);

function findWay(start, res, cost, visit, originStart) {
  if (res.length === n) {
    if (cities[start][originStart] === 0) return;
    if (totalCost > cost + cities[start][originStart]) {
      //   console.log(console.log(`res: ${res}`));
      totalCost = cost + cities[start][originStart];
    }
    return;
  }
  for (let j = 0; j < n; j++) {
    if (start === j || originStart === j) continue;
    if (cities[start][j] === 0 || visit[start][j] === 1) continue;
    visit[start][j] = 1;
    visit[j][start] = 1;
    res.push(j);
    findWay(j, res, cost + cities[start][j], visit, originStart);
    res.pop();
    visit[start][j] = 0;
    visit[j][start] = 0;
  }
  return;
}
