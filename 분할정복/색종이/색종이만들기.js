const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let ns = [0, 2, 4, 8, 16, 32, 64, 128];
let size = +input[0];
let n = ns.indexOf(size);
// console.log("n", n);
let paper = [];
for (let i = 1; i < input.length; i++) {
  paper.push(input[i].split(" "));
}

// console.log("paper:", paper);

let visit = Array.from(Array(size), () => Array(size).fill(false));
// console.log(visit);

// let y = Math.pow(2, n) / 2;
// let x = y;

let whitePapers = 0;
let bluePapers = 0;

divideConquer(size, 0, 0, size, size);

console.log(whitePapers + "\n" + bluePapers);

function divideConquer(size, startRow, startCol, endRow, endCol) {
  //   console.log("size:", size, "startRow:", startRow, "startCol:", startCol, "endRow:", endRow, "endCol:", endCol);
  if (!visit[startRow][startCol] && isFull(startRow, startCol, endRow, endCol)) {
    // console.log("%%%%%% counted startRow:", startRow, "startCol:", startCol, "endRow:", endRow, "endCol:", endCol);
    paper[startRow][startCol] === "0" ? whitePapers++ : bluePapers++;
    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        visit[i][j] = true;
      }
    }
    // console.log("visit:", visit);
    return;
  }

  let mid = Math.floor(size / 2);
  divideConquer(mid, startRow, startCol, startRow + mid, startCol + mid); // 1면
  divideConquer(mid, startRow, mid + startCol, startRow + mid, endCol); // 2면
  divideConquer(mid, mid + startRow, startCol, endRow, startCol + mid); //
  divideConquer(mid, mid + startRow, mid + startCol, endRow, endCol);
}

function isFull(startRow, startCol, endRow, endCol) {
  const start = paper[startRow][startCol];
  for (let i = startRow; i < endRow; i++) {
    for (let j = startCol; j < endCol; j++) {
      if (paper[i][j] !== start) return false;
    }
  }
  return true;
}
