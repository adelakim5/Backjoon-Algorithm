const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, k] = input[0].split(" ").map((e) => +e);
const backpacks = input.slice(1).map((e) => e.split(" ").map((i) => +i));
// console.log(backpacks);
const dp = Array.from(Array(n + 1), () => Array(k + 1).fill(0));
for (let i = 1; i <= n; i++) {
  const weight = backpacks[i - 1][0];
  const value = backpacks[i - 1][1];
  for (let j = 0; j <= k; j++) {
    if (weight > j) dp[i][j] = dp[i - 1][j];
    else dp[i][j] = Math.max(dp[i][j - weight] + value, dp[i - 1][j]);
  }
}
console.log(dp[n][k]);
