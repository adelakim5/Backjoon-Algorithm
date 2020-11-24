const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const office = input.slice(1, input.length).map((e) => e.split(" ").map((i) => +i));
const wall = 6;
let min = Infinity;
// 북, 동, 남, 서
const xAxis = [-1, 0, 1, 0];
const yAxis = [0, 1, 0, -1];
const cams = getCams();
if (!cams.length) {
  findMin(office);
  console.log(min);
  return;
}
dfs(0);
console.log(min);

function dfs(idx) {
  if (idx === cams.length) {
    findMin(office);
    return;
  }
  for (let i = idx; i < cams.length; i++) {
    const [x, y, camNum] = cams[i];
    if (camNum === 1) {
      for (let k = 0; k < 4; k++) {
        const changed = camRelease(x, y, k);
        dfs(i + 1);
        reset(changed);
      }
    } else if (camNum === 2) {
      for (let k = 0; k < 2; k++) {
        const changed1 = camRelease(x, y, k);
        const changed2 = camRelease(x, y, k + 2);
        dfs(i + 1);
        reset(changed1);
        reset(changed2);
      }
    } else if (camNum === 3) {
      for (let k = 0; k < 4; k++) {
        const changed1 = camRelease(x, y, k);
        const changed2 = camRelease(x, y, k === 3 ? 0 : k + 1);
        dfs(i + 1);
        reset([...changed1, ...changed2]);
      }
    } else if (camNum === 4) {
      for (let k = 0; k < 4; k++) {
        const changed1 = camRelease(x, y, k);
        const changed2 = camRelease(x, y, k + 1 > 3 ? k - 3 : k + 1);
        const changed3 = camRelease(x, y, k + 2 > 3 ? k - 2 : k + 2);
        dfs(i + 1);
        reset([...changed1, ...changed2, ...changed3]);
      }
    } else {
      const changed1 = camRelease(x, y, 0);
      const changed2 = camRelease(x, y, 1);
      const changed3 = camRelease(x, y, 2);
      const changed4 = camRelease(x, y, 3);
      dfs(i + 1);
      reset([...changed1, ...changed2, ...changed3, ...changed4]);
    }
  }
}

function reset(changed) {
  for (let change of changed) {
    const [x, y] = change;
    office[x][y] = 0;
  }
}

function findMin(office) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (office[i][j] === 0) sum++;
    }
  }
  if (min > sum) min = sum;
}

function getCams() {
  let cams = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (office[i][j] !== 0 && office[i][j] !== wall) cams.push([i, j, office[i][j]]);
    }
  }
  return cams;
}

function camRelease(x, y, k) {
  let changed = [];
  let currX = x + xAxis[k];
  let currY = y + yAxis[k];
  while (currX >= 0 && currY >= 0 && currX < n && currY < m) {
    if (office[currX][currY] === wall) break;
    if (office[currX][currY] === 0) {
      changed.push([currX, currY]);
      office[currX][currY] = 9;
    }
    currX += xAxis[k];
    currY += yAxis[k];
  }
  return changed;
}
