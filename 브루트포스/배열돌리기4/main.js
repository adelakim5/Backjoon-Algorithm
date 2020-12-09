const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m, k] = input[0].split(" ").map((e) => +e);
const arr = input.slice(1, input.length - k).map((e) => e.split(" ").map((i) => +i));
const turnOrders = input.slice(input.length - k, input.length);
let [right, down, left, up] = [0, 0, 0, 0];
let min = Infinity;
const visit = Array(k).fill(false);
permutation([], visit, arr);
console.log(min);

function permutation(result, visit, arr) {
  if (result.length === k) {
    const copyArr = arr.slice().map((e) => [...e]);
    const newArr = move(result, copyArr);
    calculateMinOfRow(newArr);
    return;
  }

  for (let i = 0; i < turnOrders.length; i++) {
    if (!visit[i]) {
      result.push(turnOrders[i]);
      visit[i] = true;
      permutation(result, visit, arr);
      visit[i] = false;
      result.pop();
    }
  }
}

function move(result, arr) {
  for (let res of result) {
    const [r, c, s] = res.split(" ").map((e) => +e);
    let [startRow, startCol] = [r - s - 1, c - s - 1];
    let [endRow, endCol] = [r + s - 1, c + s - 1];
    while (startRow < endRow && startCol < endCol) {
      arr = moveRight(startCol, endCol, startRow, arr);
      arr = moveDown(startRow, endRow, endCol, arr);
      arr = moveLeft(startCol, endCol, endRow, arr);
      arr = moveUp(startRow, endRow, startCol, arr);
      startCol++;
      startRow++;
      endRow--;
      endCol--;
    }
  }
  return arr;
}

function calculateMinOfRow(arr) {
  for (let i = 0; i < n; i++) {
    const sum = arr[i].reduce((acc, val) => acc + val, 0);
    // console.log(sum);
    min = Math.min(min, sum);
  }
}

function moveRight(startCol, endCol, row, arr) {
  right = arr[row][endCol];
  for (let i = endCol - 1; i >= startCol; i--) {
    arr[row][i + 1] = arr[row][i];
  }
  return arr;
}

function moveDown(startRow, endRow, col, arr) {
  down = arr[endRow][col];
  for (let i = endRow - 1; i > startRow; i--) {
    arr[i + 1][col] = arr[i][col];
  }
  arr[startRow + 1][col] = right;
  return arr;
}

function moveLeft(startCol, endCol, row, arr) {
  left = arr[row][startCol];
  for (let i = startCol + 1; i < endCol; i++) {
    arr[row][i - 1] = arr[row][i];
  }
  arr[row][endCol - 1] = down;
  return arr;
}

function moveUp(startRow, endRow, col, arr) {
  for (let i = startRow + 1; i < endRow; i++) {
    arr[i - 1][col] = arr[i][col];
  }
  arr[endRow - 1][col] = left;
  return arr;
}
