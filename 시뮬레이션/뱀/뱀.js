const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const n = +input[0];
const k = +input[1];

const g = Array.from(Array(n), () => Array(n).fill(0));

let index = 2;
for (let i = 0; i < k; i++) {
  const [r, c] = input[index].split(" ").map((e) => +e);
  g[r - 1][c - 1] = 1;
  index++;
}

const l = +input[index++];

const dirInfos = [];

for (let i = 0; i < l; i++) {
  let [x, d] = input[index].split(" ");
  x = Number(x);
  d = d.replace(/\r/, "");
  dirInfos.push([x, d]);
  index++;
}

let time = 0;
let snake = [[0, 0]];
let currD = "Right";
let currLocation = [0, 0];
let infoIndex = 0;

while (true) {
  const [r, c] = currLocation;
  switch (currD) {
    case "Right":
      currLocation = isInBound(r, c + 1) ? go(currD, currLocation) : [-1];
      break;
    case "Left":
      currLocation = isInBound(r, c - 1) ? go(currD, currLocation) : [-1];
      break;
    case "Up":
      currLocation = isInBound(r - 1, c) ? go(currD, currLocation) : [-1];
      break;
    case "Down":
      currLocation = isInBound(r + 1, c) ? go(currD, currLocation) : [-1];
      break;
  }
  time++;
  if (currLocation[0] === -1) break;
  if (infoIndex < dirInfos.length && time === dirInfos[infoIndex][0]) {
    changeDirection(dirInfos[infoIndex][1]);
    infoIndex++;
  }
}

console.log(time);

function changeDirection(direct) {
  switch (currD) {
    case "Right":
      currD = direct === "L" ? "Up" : "Down";
      break;
    case "Left":
      currD = direct === "L" ? "Down" : "Up";
      break;
    case "Up":
      currD = direct === "L" ? "Left" : "Right";
      break;
    case "Down":
      currD = direct === "L" ? "Right" : "Left";
      break;
  }
}

function isInBound(nr, nc) {
  return nr >= 0 && nc >= 0 && nr < n && nc < n;
}

function go(type, currLocation) {
  const [r, c] = currLocation;
  let [nr, nc] = [0, 0];
  switch (type) {
    case "Right":
      nr = r;
      nc = c + 1;
      break;
    case "Left":
      nr = r;
      nc = c - 1;
      break;
    case "Up":
      nr = r - 1;
      nc = c;
      break;
    case "Down":
      nr = r + 1;
      nc = c;
      break;
  }
  const next = g[nr][nc];
  if (next === -1) return [-1];
  g[nr][nc] = -1;
  snake.push([nr, nc]);
  if (next === 1) g[nr][nc] = 0;
  else {
    const [tr, tc] = snake[0];
    g[tr][tc] = 0;
    snake.shift();
  }
  return [nr, nc];
}
