function solution(line, dpMax, dpMin) {
  let [a, b, c] = line
    .trim()
    .split(" ")
    .map((e) => +e);
  if (dpMax.every((e) => e === 0)) {
    return [
      [a, b, c],
      [a, b, c],
    ];
  }
  let [x, y, z] = [a, b, c];
  a += Math.max(dpMax[0], dpMax[1]);
  b += Math.max(...dpMax);
  c += Math.max(dpMax[1], dpMax[2]);
  dpMax[0] = a;
  dpMax[1] = b;
  dpMax[2] = c;

  x += Math.min(dpMin[0], dpMin[1]);
  y += Math.min(...dpMin);
  z += Math.min(dpMin[1], dpMin[2]);
  dpMin[0] = x;
  dpMin[1] = y;
  dpMin[2] = z;

  return [dpMax, dpMin];
}

// const fs = require("fs");
// const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
// const n = +input[0];
// let dpMax = Array(3).fill(0);
// let dpMin = Array(3).fill(0);
// for (let i = 1; i <= n; i++) {
//   let line = input[i];
//   [dpMax, dpMin] = solution(line, dpMax, dpMin, i);
// }
// console.log(`${Math.max(...dpMax)} ${Math.min(...dpMin)}`);

// const n = +input[0];
// const originGraph = input.slice(1).map((e) => e.split(" ").map((i) => +i));

// let dpMax = Array(3)
//   .fill(0)
//   .map((e, i) => originGraph[0][i]);
// let dpMin = Array(3)
//   .fill(0)
//   .map((e, i) => originGraph[0][i]);

// for (let i = 1; i < n; i++) {
//   dpMax[0] = Math.max(originGraph[i][0] + dpMax[0], originGraph[i][1] + dpMax[0]);
//   dpMax[1] = Math.max(originGraph[i][0] + dpMax[1], originGraph[i][1] + dpMax[1], originGraph[i][2] + dpMax[1]);
//   dpMax[2] = Math.max(originGraph[i][1] + dpMax[2], originGraph[i][2] + dpMax[2]);
//   dpMin[0] = Math.min(originGraph[i][0] + dpMin[0], originGraph[i][1] + dpMin[0]);
//   dpMin[1] = Math.min(originGraph[i][0] + dpMin[1], originGraph[i][1] + dpMin[1], originGraph[i][2] + dpMin[1]);
//   dpMin[2] = Math.min(originGraph[i][1] + dpMin[2], originGraph[i][2] + dpMin[2]);
// }
// console.log(`${Math.max(...dpMax)}\n${Math.min(...dpMin)}`);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dpMax = Array(3).fill(0);
let dpMin = Array(3).fill(0);
let n = -1;

rl.on("line", (line) => {
  if (n === -1) {
    n = +line;
  } else {
    n--;
    [dpMax, dpMin] = solution(line, dpMax, dpMin);
  }
  if (n <= 0) rl.close();
}).on("close", () => {
  console.log(`${Math.max(...dpMax)} ${Math.min(...dpMin)}`);
  process.exit();
});
