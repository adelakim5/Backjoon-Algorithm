const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("./stdin").toString().trim().split("\n");
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

const [row, column] = input[0].split(" ").map((element) => Number(element));

const getMaze = (inputs) => {
  const maze = [];

  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    const mazeRow = [];
    const rowInputs = inputs[rowIndex]
      .trim()
      .split("")
      .map((element) => Number(element));
    for (let columnIndex = 0; columnIndex < column; columnIndex++) {
      mazeRow.push(rowInputs[columnIndex]);
    }
    maze.push(mazeRow);
  }

  return maze;
};

const maze = getMaze(input.slice(1, input.length));
const checkVistiedCount = Array.from(Array(row), () => Array(column).fill(0));
const visited = Array.from(Array(row), () => Array(column).fill(false));

const bfs = () => {
  const queue = [[0, 0, 0]];
  visited[0][0] = true;
  while (queue.length !== 0) {
    const [x, y, count] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (
        nx < 0 ||
        ny < 0 ||
        nx >= column ||
        ny >= row ||
        maze[ny][nx] === 0 ||
        visited[ny][nx] ||
        checkVistiedCount[ny][nx] !== 0
      )
        continue;
      visited[ny][nx] = true;
      checkVistiedCount[ny][nx] = count + 1;
      queue.push([nx, ny, count + 1]);
    }
  }
};

bfs();

console.log(checkVistiedCount[row - 1][column - 1] + 1);