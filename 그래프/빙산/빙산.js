const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
let originIceberg = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let visit = Array.from(Array(n), () => Array(m).fill(false));
let count = 0;

const dx = [0, -1, 0, 1];
const dy = [-1, 0, 1, 0];
console.log(`originIceberg`);
console.log(originIceberg);
let time = 0;
while (true) {
  originIceberg = dissolve();
  console.log(`after dissolve, originIceberg:`);
  console.log(originIceberg);
  time++;
  if (originIceberg === -1) {
    console.log(0);
    return;
  }
  count = getCount(originIceberg);
  if (count >= 2) break;
  visit = Array.from(Array(n), () => Array(m).fill(false));
}

console.log(time);

function getIce() {
  let ice = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (originIceberg[i][j] > 0) ice.push([i, j]);
    }
  }
  return ice;
}

function dissolve() {
  let ices = getIce();
  if (ices.length === n * m || ices.length === 0) return -1;
  let iceberg = Array.from(Array(n), () => Array(m).fill(0));
  for (let ice of ices) {
    const [x, y] = ice;
    let oceanCnt = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (isInMap(nx, ny) && originIceberg[nx][ny] === 0) oceanCnt++;
    }
    if (oceanCnt) iceberg[x][y] = originIceberg[x][y] - oceanCnt > 0 ? originIceberg[x][y] - oceanCnt : 0;
    else iceberg[x][y] = originIceberg[x][y];
  }
  return iceberg;
}

function isInMap(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < m) return true;
  return false;
}

function getCount() {
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dfs(i, j)) cnt++;
    }
  }
  return cnt;
}

function dfs(x, y) {
  if (!isInMap(x, y) || visit[x][y]) return false;
  if (originIceberg[x][y] > 0) {
    visit[x][y] = true;
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
    return true;
  }
  return false;
}
