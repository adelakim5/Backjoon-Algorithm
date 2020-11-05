const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
const k = +input[1];
const apples = input.slice(2, 2 + k).map((e) => e.split(" ").map((i) => +i));
const l = input[2 + k];
let turns = input.slice(2 + k + 1, input.length).map((e) => e.split(" "));
let tIdx = 0;

let board = Array.from(Array(n), () => Array(n).fill(0));
for (let apple of apples) {
  const [x, y] = apple;
  board[x - 1][y - 1] = 1;
}

let moveTime = 0;
board[0][0] = -1;
let snake = [[0, 0]];
let snakeDirection = "Right";
let currLocation = snake[snake.length - 1];

while (true) {
  const [x, y] = currLocation;
  switch (snakeDirection) {
    case "Right":
      currLocation = isInBoard(x, y + 1) ? goRight(currLocation) : [-1];
      break;
    case "Left":
      currLocation = isInBoard(x, y - 1) ? goLeft(currLocation) : [-1];
      break;
    case "Up":
      currLocation = isInBoard(x - 1, y) ? goUp(currLocation) : [-1];
      break;
    case "Down":
      currLocation = isInBoard(x + 1, y) ? goDown(currLocation) : [-1];
      break;
  }
  ++moveTime;
  if (currLocation[0] === -1) break;
  if (tIdx < turns.length && moveTime === +turns[tIdx][0]) {
    changeDirection(turns[tIdx][1]);
    tIdx++;
  }
}

console.log(moveTime);

function isInBoard(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < n) return true;
  return false;
}

function changeDirection(direct) {
  switch (snakeDirection) {
    case "Right":
      snakeDirection = direct === "L" ? "Up" : "Down";
      break;
    case "Left":
      snakeDirection = direct === "L" ? "Down" : "Up";
      break;
    case "Up":
      snakeDirection = direct === "L" ? "Left" : "Right";
      break;
    case "Down":
      snakeDirection = direct === "L" ? "Right" : "Left";
      break;
  }
}

function goRight(currLocation) {
  const [x, y] = currLocation;
  const next = board[x][y + 1];
  if (next === -1) return [-1];
  board[x][y + 1] = -1;
  snake.push([x, y + 1]);
  if (next === 1) board[x][y + 1] = 0;
  else {
    const [tx, ty] = snake[0];
    board[tx][ty] = 0;
    snake.shift();
  }
  return [x, y + 1];
}

function goLeft(currLocation) {
  const [x, y] = currLocation;
  const next = board[x][y - 1];
  if (next === -1) return [-1];
  board[x][y - 1] = -1;
  snake.push([x, y - 1]);
  if (next === 1) board[x][y - 1] = 0;
  else {
    const [tx, ty] = snake[0];
    board[tx][ty] = 0;
    snake.shift();
  }
  return [x, y - 1];
}

function goUp(currLocation) {
  const [x, y] = currLocation;
  const next = board[x - 1][y];
  if (next === -1) return [-1];
  board[x - 1][y] = -1;
  snake.push([x - 1, y]);
  if (next === 1) board[x - 1][y] = 0;
  else {
    const [tx, ty] = snake[0];
    board[tx][ty] = 0;
    snake.shift();
  }
  return [x - 1, y];
}

function goDown(currLocation) {
  const [x, y] = currLocation;
  const next = board[x + 1][y];
  if (next === -1) return [-1];
  board[x + 1][y] = -1;
  snake.push([x + 1, y]);
  if (next === 1) board[x + 1][y] = 0;
  else {
    const [tx, ty] = snake[0];
    board[tx][ty] = 0;
    snake.shift();
  }
  return [x + 1, y];
}
