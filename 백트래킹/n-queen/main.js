const fs = require("fs");
let n = fs.readFileSync("/dev/stdin").toString().trim();
n = +n;
const visit = Array(n).fill(false);
let count = [0];
distributeQueen(0, n, count, visit, []);
console.log(count[0]);

function distributeQueen(currRow, n, count, visit, cols) {
  if (currRow >= n) {
    count[0]++;
    return;
  }
  for (let i = 0; i < n; i++) {
    if (!isPromising(currRow, cols, i, visit)) continue;
    cols.push({ row: currRow, col: i });
    visit[i] = true;
    distributeQueen(currRow + 1, n, count, visit, cols);
    visit[i] = false;
    cols.pop();
  }
}

function isPromising(currRow, cols, i, visit) {
  if (visit[i]) return false;
  for (let { row, col } of cols) {
    if (Math.abs(currRow - row) === Math.abs(col - i)) return false;
  }
  return true;
}
