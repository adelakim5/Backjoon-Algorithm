const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const square = input.slice(1).map((e) => e.split("").map((f) => +f));
// console.log(square);
let size = Math.min(n, m);
let answer = findMaxSize(size);
console.log(answer * answer);
function findMaxSize(size) {
  while (size > 1) {
    for (let i = 0; i <= n - size; i++) {
      for (let j = 0; j <= m - size; j++) {
        if (isSameVertexes(i, j, size)) return size;
      }
    }
    size--;
  }
  return 1;
}

function isSameVertexes(x, y, size) {
  const one = square[x][y];
  const two = square[x][y + size - 1];
  const three = square[x + size - 1][y];
  const four = square[x + size - 1][y + size - 1];
  if (one === two && two === three && three === four) return true;
  return false;
}
