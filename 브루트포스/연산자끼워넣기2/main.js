const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const arr = input[1].split(" ").map((e) => +e);
// console.log(arr);
let [plusCnt, minusCnt, multipleCnt, divideCnt] = input[2].split(" ").map((e) => +e);
// console.log(operators);
let max = -10000000001;
let min = 10000000001;
dfs(1, arr[0], plusCnt, minusCnt, multipleCnt, divideCnt);
console.log(max + "\n" + min);

function dfs(idx, sum, plusCnt, minusCnt, multipleCnt, divideCnt) {
  if (idx === n) {
    min = Math.min(min, sum);
    max = Math.max(max, sum);
    return;
  }
  if (plusCnt > 0) dfs(idx + 1, sum + arr[idx], plusCnt - 1, minusCnt, multipleCnt, divideCnt);
  if (minusCnt > 0) dfs(idx + 1, sum - arr[idx], plusCnt, minusCnt - 1, multipleCnt, divideCnt);
  if (multipleCnt > 0) dfs(idx + 1, sum * arr[idx], plusCnt, minusCnt, multipleCnt - 1, divideCnt);
  if (divideCnt > 0) {
    let newSum = Math.floor(Math.abs(sum) / Math.abs(arr[idx]));
    if (sum < 0) {
      newSum *= -1;
    }
    dfs(idx + 1, newSum, plusCnt, minusCnt, multipleCnt, divideCnt - 1);
  }
}
