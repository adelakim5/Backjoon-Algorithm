const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const arr1 = [...input[0].replace("\r", "")];
const arr2 = [...input[1].replace("\r", "")];

const dp = Array.from(Array(arr1.length + 1), () => Array(arr2.length + 1).fill(0));

for (let i = 0; i < arr1.length; i++) {
  const arr1Str = arr1[i];
  for (let j = 0; j < arr2.length; j++) {
    const arr2Str = arr2[j];
    if (arr1Str === arr2Str) dp[i + 1][j + 1] = dp[i][j] + 1;
    else dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
  }
}

console.log(dp[arr1.length][arr2.length]);
