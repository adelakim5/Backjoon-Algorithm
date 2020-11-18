const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim();
const n = +input;
if (n < 5) {
  console.log(0);
  return;
}
let t = BigInt(500);
let ans = factorial(t);
// console.log(factorial(t));
// console.log(ans.toString());
console.log(count(ans.toString()));

function factorial(n) {
  if (n === BigInt(1)) return n;
  return n * factorial(n - BigInt(1));
}

function count(str) {
  let cnt = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== "0") break;
    cnt++;
  }
  return cnt;
}
