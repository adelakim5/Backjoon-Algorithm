const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let [n, m, x, y, k] = input[0].split(" ").map((e) => +e);
let map = input.slice(1, input.length - 1).map((e) => e.split(" ").map((i) => +i));
const orders = input[input.length - 1].split(" ").map((e) => +e);

let dice = Array(6).fill(0);
let top = "";

if (map[x][y] !== 0) {
  dice[5] = map[x][y];
}

for (let i = 0; i < orders.length; i++) {
  const order = orders[i];
  switch (order) {
    case 1:
      if (!isInMap(x, y + 1)) break;
      turnEast();
      ++y;
      break;
    case 2:
      if (!isInMap(x, y - 1)) break;
      turnWest();
      --y;
      break;
    case 3:
      if (!isInMap(x - 1, y)) break;
      turnNorth();
      --x;
      break;
    case 4:
      if (!isInMap(x + 1, y)) break;
      turnSouth();
      ++x;
      break;
  }
}
console.log(top.trim());

function isInMap(nx, ny) {
  if (nx >= 0 && nx < n && ny >= 0 && ny < m) return true;
  return false;
}

function turnNorth() {
  let temp = dice[0];
  dice[0] = dice[4];
  dice[4] = dice[5];
  dice[5] = dice[1];
  dice[1] = temp;
  top += dice[0] + "\n";
  if (map[x - 1][y] !== 0) {
    dice[5] = map[x - 1][y];
    map[x - 1][y] = 0;
  } else map[x - 1][y] = dice[5];
}

function turnSouth() {
  let temp = dice[0];
  dice[0] = dice[1];
  dice[1] = dice[5];
  dice[5] = dice[4];
  dice[4] = temp;
  top += dice[0] + "\n";
  if (map[x + 1][y] !== 0) {
    dice[5] = map[x + 1][y];
    map[x + 1][y] = 0;
  } else map[x + 1][y] = dice[5];
}

function turnEast() {
  let temp = dice[0];
  dice[0] = dice[3];
  dice[3] = dice[5];
  dice[5] = dice[2];
  dice[2] = temp;
  top += dice[0] + "\n";
  if (map[x][y + 1] !== 0) {
    dice[5] = map[x][y + 1];
    map[x][y + 1] = 0;
  } else map[x][y + 1] = dice[5];
}

function turnWest() {
  let temp = dice[0];
  dice[0] = dice[2];
  dice[2] = dice[5];
  dice[5] = dice[3];
  dice[3] = temp;
  top += dice[0] + "\n";
  if (map[x][y - 1] !== 0) {
    dice[5] = map[x][y - 1];
    map[x][y - 1] = 0;
  } else map[x][y - 1] = dice[5];
}
