const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = +input[0];
const arr = Array(n + 1).fill([0, 0]);
for (let i = 1; i < input.length; i++) {
  arr[i] = input[i].split(" ").map((e) => +e);
}
let max = 0;
for (let i = 1; i <= n; i++) {
  getMax(i, 0, []);
}
console.log(max);
function getMax(idx, impossible, res) {
  for (let i = idx; i <= n; i++) {
    if (i < impossible) continue;
    if (i + arr[i][0] > n + 1) continue;
    res.push({ i, val: arr[i][1], day: i + arr[i][0] });
    getMax(i + 1, i + arr[i][0], res);
    res.pop();
  }
  const sum = res.reduce((acc, val) => acc + val.val, 0);
  if (max < sum) max = sum;
  return;
}
