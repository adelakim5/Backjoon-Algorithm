const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, k] = input[0].split(" ").map((e) => +e);
const dp = Array(k + 1).fill(0);
for (let i = 1; i <= n; i++) {
  const [weight, value] = input[i].split(" ").map((e) => +e);
  for (let j = k; j >= weight; j--) {
    dp[j] = Math.max(dp[j], dp[j - weight] + value);
  }
}
console.log(dp[k]);
