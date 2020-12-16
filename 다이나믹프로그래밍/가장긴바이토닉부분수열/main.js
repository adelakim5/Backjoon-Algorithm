const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const nums = input[1].split(" ").map((e) => +e);
const up = fillIncrement();
const down = fillDecrement();
let max = 0;
for (let i = 0; i < n; i++) {
  const len = up[i].length + down[i].length - 1;
  if (max < len) max = len;
}
console.log(max);

function fillDecrement() {
  let dp = Array(n);
  dp[n - 1] = [nums[n - 1]];
  dp[n - 2] = nums[n - 1] < nums[n - 2] ? [nums[n - 1], nums[n - 2]] : [nums[n - 2]];
  for (let i = n - 3; i >= 0; i--) {
    let maxLength = 0;
    let temp = [];
    for (let j = i + 1; j < n; j++) {
      if (nums[i] > dp[j][dp[j].length - 1] && maxLength < dp[j].length + 1) {
        temp = dp[j].slice();
        temp.push(nums[i]);
        maxLength = temp.length;
      }
    }
    dp[i] = temp.length > 0 ? temp : [nums[i]];
  }
  return dp;
}

function fillIncrement() {
  let dp = Array(n);
  dp[0] = [nums[0]];
  dp[1] = nums[1] > nums[0] ? [nums[0], nums[1]] : [nums[1]];
  for (let i = 2; i < n; i++) {
    let maxLength = 0;
    let temp = [];
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] > dp[j][dp[j].length - 1] && maxLength < dp[j].length + 1) {
        temp = dp[j].slice();
        temp.push(nums[i]);
        maxLength = temp.length;
      }
    }
    dp[i] = temp.length > 0 ? temp : [nums[i]];
  }
  return dp;
}
