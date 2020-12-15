const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const nums = input.slice(1).map((e) => +e);
const dp = Array(n).fill(-1);
dp[0] = nums[0];
for (let i = 1; i < n; i++) {
  dp[i] = Math.max(nums[i], dp[i - 1] * nums[i]);
}
console.log(Math.max(...dp).toFixed(3));
