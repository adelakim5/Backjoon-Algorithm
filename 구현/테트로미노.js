const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input
  .splice(0, 1)[0]
  .split(" ")
  .map((e) => +e);
const graph = input.map((e) => e.split(" ").map((i) => +i));
// console.log(graph);

let max = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    let value = Math.max(
      verticalBar(i, j),
      horizontalBar(i, j),
      leftVerticalL(i, j),
      rightVerticalL(i, j),
      leftHorizontalL(i, j),
      rightHorizontalL(i, j),
      leftKiok(i, j),
      rightKiok(i, j),
      leftHorizontalKiok(i, j),
      rightHorizontalKiok(i, j),
      leftChair(i, j),
      rightChair(i, j),
      turnedLeftChair(i, j),
      turnedRightChair(i, j),
      reversedMountain(i, j),
      mountain(i, j),
      leftTurnedMountain(i, j),
      rightTurnedMountain(i, j),
      square(i, j)
    );
    if (max < value) max = value;
  }
}

console.log(max);

function isPossible(x, y) {
  // 범위 안에 포함되는지 체크
  if (x >= 0 && y >= 0 && x < n && y < m) return true;
  return false;
}

function calSum(x, y, dx, dy, sum) {
  for (let i = 0; i < 3; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (!isPossible(nx, ny)) return -1; // 범위 바깥이면 -1 리턴
    sum += graph[nx][ny];
  }
  return sum;
}

// ㅡ
function verticalBar(x, y) {
  const dx = [1, 2, 3];
  const dy = [0, 0, 0];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㅣ
function horizontalBar(x, y) {
  const dx = [0, 0, 0];
  const dy = [1, 2, 3];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// L
function leftVerticalL(x, y) {
  const dx = [1, 2, 2];
  const dy = [0, 0, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 대칭 L
function rightVerticalL(x, y) {
  const dx = [1, 2, 2];
  const dy = [0, 0, -1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 누운 L
function leftHorizontalL(x, y) {
  const dx = [1, 1, 1];
  const dy = [0, -1, -2];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 대칭 누운 L
function rightHorizontalL(x, y) {
  const dx = [1, 1, 1];
  const dy = [0, 1, 2];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 대칭 ㄱ
function leftKiok(x, y) {
  const dx = [0, 1, 2];
  const dy = [1, 0, 0];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㄱ
function rightKiok(x, y) {
  const dx = [0, 1, 2];
  const dy = [1, 1, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 대칭 누운 ㄱ
function leftHorizontalKiok(x, y) {
  const dx = [1, 0, 0];
  const dy = [0, 1, 2];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

//  누운 ㄱ
function rightHorizontalKiok(x, y) {
  const dx = [0, 0, 1];
  const dy = [1, 2, 2];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 의자모양
function leftChair(x, y) {
  const dx = [1, 1, 2];
  const dy = [0, 1, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 대칭 의자모양
function rightChair(x, y) {
  const dx = [1, 1, 2];
  const dy = [0, -1, -1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 의자모양 회전
function turnedLeftChair(x, y) {
  const dx = [1, 1, 0];
  const dy = [0, -1, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// 대칭 의자모양 회전
function turnedRightChair(x, y) {
  const dx = [0, 1, 1];
  const dy = [1, 1, 2];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㅜ
function reversedMountain(x, y) {
  const dx = [0, 0, 1];
  const dy = [1, 2, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㅗ
function mountain(x, y) {
  const dx = [1, 1, 1];
  const dy = [-1, 0, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㅏ
function leftTurnedMountain(x, y) {
  const dx = [1, 1, 2];
  const dy = [0, 1, 0];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㅓ
function rightTurnedMountain(x, y) {
  const dx = [1, 1, 2];
  const dy = [-1, 0, 0];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}

// ㅁ
function square(x, y) {
  const dx = [0, 1, 1];
  const dy = [1, 0, 1];
  const sum = calSum(x, y, dx, dy, graph[x][y]);
  return sum;
}
