const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n").map((e) => e.replace(/\r/g, ""));
const input = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.replace(/\r/g, ""));
// console.log(input);
const backgroundPaper = input.map((e) => e.split(" ").map((f) => +f));

const papers = [5, 5, 5, 5, 5];
let min = Infinity;
dfs(0, 0, 0);
console.log(min === Infinity ? -1 : min);

function dfs(x, y, usedCnt) {
  while (backgroundPaper[x][y] === 0) {
    if (++x >= 10) {
      if (++y >= 10) {
        min = Math.min(min, usedCnt);
        return;
      }
      x = 0;
    }
  }
  for (let n = 5; n > 0; n--) {
    if (papers[n - 1] === 0) continue;
    if (canCover(x, y, n)) {
      cover(x, y, n, 0);
      papers[n - 1]--;
      dfs(x, y, usedCnt + 1);
      papers[n - 1]++;
      cover(x, y, n, 1);
    }
  }
}

function cover(startRow, startCol, n, value) {
  for (let i = startRow; i < startRow + n; i++) {
    for (let j = startCol; j < startCol + n; j++) {
      backgroundPaper[i][j] = value;
    }
  }
}

function canCover(startRow, startCol, n) {
  if (startRow + n > 10 || startCol + n > 10) return false;
  for (let i = startRow; i < startRow + n; i++) {
    for (let j = startCol; j < startCol + n; j++) {
      if (backgroundPaper[i][j] === 0) return false;
    }
  }
  return true;
}
