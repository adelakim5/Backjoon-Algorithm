const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const n = +input[0];

const dp = Array(101).fill(0);
dp[0] = 1;
dp[1] = 1;
dp[2] = 1;
dp[3] = 2;
dp[4] = 2;
dp[5] = 3;
dp[6] = 4;
dp[7] = 5;

let dpIndex = 8;
let leftIndex = 7;
let rightIndex = 3;

while (dpIndex < 101) {
  dp[dpIndex] = dp[leftIndex] + dp[rightIndex];
  leftIndex++;
  rightIndex++;
  dpIndex++;
}

let result = "";

for (let i = 1; i <= n; i++) {
  const currN = +input[i];
  result += dp[currN - 1] + "\n";
}

console.log(result.trim());
