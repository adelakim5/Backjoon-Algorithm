const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim();
// console.log(input.length);
if (input.length === 1) {
  console.log(0);
  return;
}
let mid = Math.floor(input.length / 2);
let size = Math.ceil(count(input) / 2);
if (size < 1) {
  console.log(0);
  return;
}
if (size > mid) {
  console.log(size + 1);
} else {
  console.log(size);
}
function count(str) {
  let cnt = 0;
  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] !== str[i]) cnt++;
  }
  return cnt;
}
