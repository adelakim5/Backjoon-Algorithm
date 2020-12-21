const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim();
const n = +input;
const start = n - input.length * 9;
let answer = Infinity;

for (let i = start; i < n; i++) {
  let sum = getSum(i);
  if (sum === n) {
    answer = i;
    break;
  }
}

console.log(answer === Infinity ? 0 : answer);

function getSum(sum) {
  let arr = sum
    .toString()
    .split("")
    .map((e) => +e);
  return sum + arr.reduce((acc, val) => acc + val, 0);
}
