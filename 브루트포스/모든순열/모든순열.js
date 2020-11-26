const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim();
// const input = fs.readFileSync("/dev/stdin").toString().trim()
const num = +input;
let visit = Array(num).fill(0);
const results = new Set();
permutation([], visit);
// console.log(results);
print(results);
function print(results) {
  let res = "";
  for (let result of results) {
    res += result + "\n";
  }
  console.log(res.trim());
}
function permutation(res, visit) {
  if (res.length === num) {
    results.add(res.join(" "));
    return;
  }

  for (let i = 1; i <= num; i++) {
    if (!visit[i]) {
      res.push(i);
      visit[i] = 1;
      permutation(res, visit);
      visit[i] = 0;
      res.pop();
    }
  }
}
