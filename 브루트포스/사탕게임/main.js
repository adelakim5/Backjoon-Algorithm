const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
// const input = fs.readFileSync("/dev/stdin").toString().trim()..split("\n")
const n = +input[0];
let arr = input.slice(1).map((e) => e.split(""));
// console.log(arr);
let check = Array.from(Array(n), () => Array(n).fill(false));
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let max = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const color = arr[i][j];
    // console.log(`curr: ${i}, ${j}`);
    for (let k = 0; k < 4; k++) {
      const nx = i + dx[k];
      const ny = j + dy[k];
      if (!isInArr(nx, ny) || arr[nx][ny] === color || check[nx][ny]) continue;
      // console.log(`nx: ${nx}, ny: ${ny}`);
      arr[i][j] = arr[nx][ny];
      arr[nx][ny] = color;
      findMax();
      arr[nx][ny] = arr[i][j];
      arr[i][j] = color;
      check[i][j] = true;
    }
  }
}

function findMax() {
  let visitRow = Array.from(Array(n), () => Array(n).fill(false));
  let visitCol = Array.from(Array(n), () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dfsRow(i, j, 1, arr[i][j], visitRow);
      dfsCol(i, j, 1, arr[i][j], visitCol);
    }
  }
}

console.log(max);
function dfsCol(x, y, len, color, visit) {
  if (!isInArr(x, y) || visit[x][y] || arr[x][y] !== color) return;
  if (len > max) max = len;
  visit[x][y] = true;
  dfsCol(x, y + 1, len + 1, color, visit);
  dfsCol(x, y - 1, len + 1, color, visit);
  return;
}

function dfsRow(x, y, len, color, visit) {
  if (!isInArr(x, y) || visit[x][y] || arr[x][y] !== color) return;
  if (len > max) max = len;
  visit[x][y] = true;
  dfsRow(x + 1, y, len + 1, color, visit);
  dfsRow(x - 1, y, len + 1, color, visit);
  return;
}

function isInArr(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < n) return true;
  return false;
}
