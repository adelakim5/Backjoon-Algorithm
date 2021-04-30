const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const n = +input[0];
const triangle = input.slice(1).map((e) => e.split(" ").map((i) => +i));

const dp = triangle.map((e) => [...e]);

for (let i = 1; i < dp.length; i++) {
  for (let j = 0; j <= i; j++) {
    const val = dp[i][j];
    if (j === 0) dp[i][j] += dp[i - 1][j];
    else if (j === i) dp[i][j] += dp[i - 1][j - 1];
    else dp[i][j] = Math.max(dp[i - 1][j - 1] + val, dp[i - 1][j] + val);
  }
}

console.log(Math.max(...dp[n - 1]));
