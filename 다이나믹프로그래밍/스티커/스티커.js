const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const tc = +input[0];
let answer = "";
for (let i = 1; i < tc * 3 + 1; i += 3) {
  const n = +input[i];
  const stickers = input.slice(i + 1, i + 3).map((e) => e.split(" ").map((i) => +i));
  const dp = Array.from(Array(2), () => Array(n).fill(0));
  dp[0][0] = stickers[0][0];
  dp[1][0] = stickers[1][0];
  let max = 0;
  for (let i = 1; i < n; i++) {
    dp[0][i] = Math.max(stickers[0][i] + max, stickers[0][i] + dp[1][i - 1]);
    dp[1][i] = Math.max(stickers[1][i] + max, stickers[1][i] + dp[0][i - 1]);
    max = Math.max(dp[0][i - 1], dp[1][i - 1]);
  }
  answer += Math.max(dp[0][n - 1], dp[1][n - 1]) + "\n";
}

console.log(answer.trim());

function getSum(col, stickers, startRow) {
  let sum = stickers[startRow][col];
  col--;
  while (col >= 0) {
    if (startRow === 0) {
      sum += stickers[1][col];
      startRow = 1;
    } else {
      sum += stickers[0][col];
      startRow = 0;
    }
    col--;
  }
  return sum;
}
