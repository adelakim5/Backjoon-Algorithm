const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [c, n] = input[0].split(" ").map((e) => +e);
let customers = input.slice(1).map((e) => e.split(" ").map((i) => +i));
customers.sort((a, b) => a[0] - b[0]);

let dp = Array(c + 1).fill(Infinity);
dp[0] = 0;

for (let [cost, customN] of customers) {
  if (dp[customN] > cost) dp[customN] = cost;
  for (let i = 1; i <= c; i++) {
    dp[i] = i <= customN ? Math.min(dp[i], cost) : Math.min(dp[i], dp[customN] + dp[i - customN]);
  }
}

console.log(dp[c]);
