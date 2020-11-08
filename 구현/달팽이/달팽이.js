const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
const dest = +input[1];

let table = Array.from(Array(n), () => Array(n).fill(0));
const [initX, initY] = [Math.floor(n / 2), Math.floor(n / 2)];
let [x, y] = [initX, initY];
let len = 1;
let currValue = 0;
let pastSize = 0;
let destCoords = "";

for (let size = 3; size <= n; size += 2) {
  for (let i = pastSize; i < size ** 2; i++) {
    currValue++;
    // console.log(`x: ${x}, y: ${y}`);
    table[x][y] = currValue;
    if (currValue === dest) destCoords = x + 1 + " " + (y + 1);
    if (currValue === 1) {
      x--;
      continue;
    }
    if (x === initX - len) {
      if (y === initY - len) {
        x--;
      } else if (y === initY + len) {
        x++;
      } else {
        y++;
      }
    } else if (x === initX + len) {
      if (y === initY - len) {
        x--;
      } else {
        y--;
      }
    } else {
      if (y === initY - len) {
        x--;
      } else {
        x++;
      }
    }
  }
  pastSize = size ** 2;
  len++;
}

function print(arr, dest) {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += arr[i].join(" ") + "\n";
  }
  result += dest;
  console.log(result);
}

print(table, destCoords);
