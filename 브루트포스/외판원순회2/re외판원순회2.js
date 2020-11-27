const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const cities = input.slice(1).map((e) => e.split(" ").map((i) => +i));
// console.log(cities);
let visit = Array(n).fill(0);
let min = Infinity;
// let ways = [];
permutation([], visit);
console.log(min);

function visitCity(way) {
  let flag = true;
  let sum = 0;
  for (let i = 1; i < way.length; i++) {
    const x = way[i - 1];
    const y = way[i];
    if (cities[x][y] === 0) {
      flag = false;
      break;
    }
    sum += cities[x][y];
  }
  sum += cities[way[n - 1]][way[0]];
  if (flag && sum < min) min = sum;
}

function permutation(res, visit) {
  if (res.length === n) {
    const last = res[n - 1];
    const start = res[0];
    if (cities[last][start] > 0) visitCity(res); // 전역 배열에 다 담고 시작하기 보다는 여기서 바로 도시 방문 시작하는게 더 메모리 낮춤
    return;
  }

  for (let i = 0; i < n; i++) {
    if (!visit[i]) {
      res.push(i);
      visit[i] = 1;
      permutation(res, visit);
      visit[i] = 0;
      res.pop();
    }
  }
}
