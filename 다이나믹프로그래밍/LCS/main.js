const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("stdin.txt").toString().replace(/\r/g, "").trim().split("\n");
const arr1 = input[0].split("");
const arr2 = input[1].split("");
const dp = Array.from(Array(arr2.length + 1), () => Array(arr1.length + 1).fill(0));
for (let i = 0; i < arr2.length; i++) {
  const arr2Str = arr2[i];
  for (let j = 0; j < arr1.length; j++) {
    const arr1Str = arr1[j];
    if (arr2Str === arr1Str) dp[i + 1][j + 1] = dp[i][j] + 1;
    else {
      dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
    }
  }
}

console.log(dp[arr2.length][arr1.length]);
