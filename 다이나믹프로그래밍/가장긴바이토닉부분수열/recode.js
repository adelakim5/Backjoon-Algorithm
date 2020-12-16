const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const nums = input[1].split(" ").map((e) => +e);
const up = Array(n).fill(1);
const down = Array(n).fill(1);
for (let i = 0; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    if (nums[i] > nums[j] && up[i] < up[j] + 1) up[i] = up[j] + 1;
    if (nums[n - 1 - i] > nums[n - 1 - i + j] && down[n - 1 - i] < down[n - 1 - i + j] + 1) down[n - 1 - i] = down[n - 1 - i + j] + 1;
  }
}
let max = 0;
for (let i = 0; i < n; i++) {
  if (up[i] + down[i] - 1 > max) max = up[i] + down[i] - 1;
}
console.log(max);
