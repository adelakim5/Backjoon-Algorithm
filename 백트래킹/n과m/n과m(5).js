const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
input[0] = input[0].split(" ").map((e) => +e);
const n = input[0][0];
const m = input[0][1];
const numbers = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b);

let res = [];
let ans = [];
backTrack(res, ans);
console.log(ans.join("\n").trim());

function backTrack(res, ans) {
  if (res.length === m) {
    ans.push(res.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (res.length && res[res.length - 1] === numbers[i]) continue;
    if (!res.length || check(numbers[i], res)) {
      res.push(numbers[i]);
      backTrack(res, ans);
      res.pop();
    }
  }
}

function check(str, ans) {
  for (let a of ans) {
    if (a === str) return false;
  }
  return true;
}
