const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const n = +input[0];
const numbers = input[1].split(" ").reduce(
  (acc, val) => {
    acc.push(+val);
    return acc;
  },
  [0]
);
const questionCount = +input[2];

let result = "";
const dp = Array.from(Array(n + 1), () => Array(n + 1).fill(false));
for (let i = 1; i <= n; i++) {
  dp[i][i] = true;
  if (numbers[i] === numbers[i - 1]) dp[i - 1][i] = true;
}

for (let size = 2; size <= n - 1; size++) {
  for (let j = 1; j <= n - size; j++) {
    if (numbers[j] === numbers[j + size] && dp[j + 1][j + size - 1]) dp[j][j + size] = true;
  }
}

for (let i = 3; i < 3 + questionCount; i++) {
  const [s, e] = input[i].split(" ").map((e) => +e);
  if (dp[s][e]) result += 1 + "\n";
  else result += 0 + "\n";
}

console.log(result.trim());
