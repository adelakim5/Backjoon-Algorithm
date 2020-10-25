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
  if (input[1] === "-1") {
    console.log(1 + "\n" + 0 + "\n" + 0);
  } else if (input[1] === "0") {
    console.log(0 + "\n" + 1 + "\n" + 0);
  } else {
    console.log(0 + "\n" + 0 + "\n" + 1);
  }
  return;
}

let paper = [];
for (let i = 1; i <= n; i++) {
  paper.push(input[i].split(" "));
}
let visit = Array.from(Array(n), () => Array(n).fill(false));
// console.log(paper);
let minus = 0;
let zero = 0;
let plus = 0;
divideAndConquer(n, 0, 0, n, n);
// console.log(`minus:${minus}, zero:${zero}, plus:${plus}`);
console.log(minus + "\n" + zero + "\n" + plus);

function divideAndConquer(size, startRow, startCol, endRow, endCol) {
  if (!visit[startRow][startCol] && isFull(startRow, startCol, endRow, endCol)) {
    if (paper[startRow][startCol] === "-1") minus++;
    if (paper[startRow][startCol] === "0") zero++;
    if (paper[startRow][startCol] === "1") plus++;
    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        visit[i][j] = true;
      }
    }
    return;
  }
  let mid1 = Math.floor(size / 3);
  let mid2 = mid1 * 2;
  divideAndConquer(mid1, startRow, startCol, startRow + mid1, startCol + mid1);
  divideAndConquer(mid1, startRow, startCol + mid1, startRow + mid1, startCol + mid2);
  divideAndConquer(mid1, startRow, startCol + mid2, startRow + mid1, endCol);
  divideAndConquer(mid1, startRow + mid1, startCol, startRow + mid2, startCol + mid1);
  divideAndConquer(mid1, startRow + mid1, startCol + mid1, startRow + mid2, startCol + mid2);
  divideAndConquer(mid1, startRow + mid1, startCol + mid2, startRow + mid2, endCol);
  divideAndConquer(mid1, startRow + mid2, startCol, endRow, startCol + mid1);
  divideAndConquer(mid1, startRow + mid2, startCol + mid1, endRow, startCol + mid2);
  divideAndConquer(mid1, startRow + mid2, startCol + mid2, endRow, endCol);
}

function isFull(startRow, startCol, endRow, endCol) {
  const paperStatus = paper[startRow][startCol];
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (paper[i][j] !== paperStatus) return false;
    }
  }
  return true;
}
