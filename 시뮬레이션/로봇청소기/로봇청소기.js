const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
console.log(n, m);
let [x, y, d] = input[1].split(" ").map((e) => +e);
console.log(x, y, d);
let map = [];
for (let i = 2; i < 2 + n; i++) {
  map.push(input[i].split(" "));
}
// console.log(map);

let visit = Array.from(Array(n), () => Array(m).fill(false));
visit[x][y] = true;
console.log(visit);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

function turnLeft() {
  d -= 1;
  if (d === -1) d = 3;
}

let cnt = 1;
let turnTime = 0;
while (true) {
  turnLeft();
  nx = x + dx[d];
  ny = y + dy[d];
  if (!visit[nx][ny] && map[nx][ny] === "0") {
    visit[nx][ny] = true;
    x = nx;
    y = ny;
    cnt++;
    turnTime = 0;
    continue;
  } else {
    turnTime++;
  }
  if (turnTime === 4) {
    // 4 방향 모두 불가능이면
    nx = x - dx[d];
    ny = y - dy[d];
    if (map[nx][ny] === "0") {
      x = nx;
      y = ny;
    } else break;
    turnTime = 0;
  }
}

console.log(cnt);
