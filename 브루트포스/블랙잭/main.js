const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const cards = input[1].split(" ").map((e) => +e);
let min = Infinity;
let answer = -1;
combination([], 0);
console.log(answer);
function combination(res, idx) {
  if (res.length === 3) {
    const sum = res.reduce((acc, val) => acc + val, 0);
    const diff = Math.abs(sum - m);
    if (sum <= m && diff < min) {
      min = diff;
      answer = sum;
    }
    return;
  }
  for (let i = idx; i < n; i++) {
    res.push(cards[i]);
    combination(res, i + 1);
    res.pop();
  }
}
