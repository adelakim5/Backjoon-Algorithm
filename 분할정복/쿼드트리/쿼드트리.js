const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];

if (n === 1) {
  console.log("(" + input[1] + ")");
  return;
}

let video = [];
for (let i = 1; i <= n; i++) {
  video.push(input[i].split(""));
}
// console.log("video:", video);
let visit = Array.from(Array(n), () => Array(n).fill(false));

let result = [];
// let cnt = [0];
quadTree(n, 0, 0, n, n, 0);
console.log(result.join(""));

function quadTree(size, startRow, startCol, endRow, endCol, numberOfField) {
  if (numberOfField === 1) result.push("(");
  if (!visit[startRow][startCol] && isFull(startRow, startCol, endRow, endCol)) {
    video[startRow][startCol] === "0" ? result.push("0") : result.push("1");
    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        visit[i][j] = true;
      }
    }
    // 이건 마지막에
    if (numberOfField === 4) result.push(")");
    return;
  }
  let mid = Math.floor(size / 2);
  quadTree(mid, startRow, startCol, startRow + mid, startCol + mid, 1);
  quadTree(mid, startRow, startCol + mid, startRow + mid, endCol, 2);
  quadTree(mid, startRow + mid, startCol, endRow, startCol + mid, 3);
  quadTree(mid, startRow + mid, startCol + mid, endRow, endCol, 4);
  console.log("result:", result);
  if (numberOfField === 4) result.push(")");
}

function isFull(startRow, startCol, endRow, endCol) {
  let number = video[startRow][startCol];
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (number !== video[i][j]) return false;
    }
  }
  return true;
}
