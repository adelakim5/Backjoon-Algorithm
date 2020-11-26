const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = +input[0];
const arr = input[1].split(" ").map((e) => +e);
const visit = Array(n).fill(0);
let results = new Set();

sort([], arr, visit);
const answer = sum(results);
console.log(answer);

function sum(results) {
  let max = 0;
  for (let result of results) {
    let array = result.split(" ").map((e) => +e);
    let sum = 0;
    for (let i = 1; i < array.length; i++) {
      sum += Math.abs(array[i - 1] - array[i]);
    }
    if (max < sum) max = sum;
  }
  return max;
}

function sort(res, arr, visit) {
  if (res.length === n) {
    results.add(res.join(" "));
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!visit[i]) {
      res.push(arr[i]);
      visit[i] = 1;
      sort(res, arr, visit);
      visit[i] = 0;
      res.pop();
    }
  }
}
