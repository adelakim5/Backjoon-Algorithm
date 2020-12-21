const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim();
const len = input.length;
const n = +input;
let min = Infinity;

for (let size = len; size > 0; size--) {
  combination(size, []);
}

console.log(min === Infinity ? 0 : min);

function combination(size, res) {
  if (res.length === size) {
    const number = +res.join("");
    const sum = getSum(res, number);
    if (sum === n && sum < min) {
      min = number;
    }
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (res.length <= 0 && i === 0) continue;
    res.push(i);
    combination(size, res);
    res.pop();
  }
}

function getSum(res, number) {
  for (let i = 0; i < res.length; i++) {
    number += res[i];
  }
  return number;
}
