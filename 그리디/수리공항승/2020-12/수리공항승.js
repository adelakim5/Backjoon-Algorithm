const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const [n, l] = input[0].split(" ").map((e) => +e);
const arr = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b); // 반드시 정렬
let cnt = 0;
let i = 0;
while (i < n) {
  const curr = arr[i] - 0.5 + l;
  cnt++;
  i = count(curr, i);
}
console.log(cnt);

function count(curr, idx) {
  let res = n;
  for (let i = idx; i < n; i++) {
    if (arr[i] + 0.5 > curr) return i;
  }
  return res;
}
