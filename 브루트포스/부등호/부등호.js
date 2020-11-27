const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n")
const n = +input[0];
const arr = input[1].split(" ");
const visit = Array(10).fill(0);
let [min, max] = [Infinity, 0];
let [minStr, maxStr] = ["", ""];
permutation([], visit, 0);
console.log(maxStr + "\n" + minStr);

function setMinMax(value) {
  let numVal = Number(value);
  if (min > numVal) {
    min = numVal;
    minStr = value;
  }
  if (max < numVal) {
    max = numVal;
    maxStr = value;
  }
}

function permutation(res, visit, cnt) {
  if (res.length === n) {
    let start = res[n - 1];
    if (arr[n - 1] === "<") {
      for (let i = start + 1; i <= 9; i++) {
        if (visit[i]) continue;
        setMinMax(res.join("") + i);
      }
    } else {
      for (let i = start - 1; i >= 0; i--) {
        if (visit[i]) continue;
        setMinMax(res.join("") + i);
      }
    }
    return;
  }

  for (let i = 0; i <= 9; i++) {
    if (visit[i]) continue;
    if (cnt === 0 || (arr[cnt - 1] === "<" && i > res[cnt - 1]) || (arr[cnt - 1] === ">" && i < res[cnt - 1])) {
      res.push(i);
      visit[i] = 1;
      permutation(res, visit, cnt + 1);
      visit[i] = 0;
      res.pop();
    }
  }
}
