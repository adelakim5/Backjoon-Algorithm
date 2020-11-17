const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
let arr = input.slice(1).map((e) => +e);

if (n === 1) {
  console.log(0);
  return;
}

let sum = 0;
for (let i = n - 1; i > 0; i--) {
  if (arr[i] <= arr[i - 1]) {
    let temp = Math.abs(arr[i] - arr[i - 1]);
    arr[i - 1] -= temp + 1;
    sum += temp + 1;
  }
}
console.log(arr);
console.log(sum);
