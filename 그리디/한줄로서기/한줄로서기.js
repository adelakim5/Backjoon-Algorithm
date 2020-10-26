const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().slice(1).split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
const arr = input[1].split(" ").map((e) => +e);
let sortedArr = [];

for (let i = n - 1; i >= 0; i--) {
  if (!sortedArr.length) {
    sortedArr.push(i + 1);
    continue;
  }
  let idx = arr[i];
  sortedArr.splice(idx, 0, i + 1);
}

console.log(sortedArr.join(" "));
