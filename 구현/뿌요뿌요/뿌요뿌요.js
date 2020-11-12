const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map((e) => e.split(""));
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((e) => e.split(""));

// console.log(input);
let [r, c] = [input.length, input[0].length];
let chain = 0;
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

let res = [];
while (true) {
  find();
  //   console.log(input);
  //   console.log(res);
  if (!res.length) break;
  setDown();
  chain++;
  res = [];
}
console.log(chain);

function find() {
  for (let i = r - 1; i >= 0; i--) {
    for (let j = 0; j < c; j++) {
      if (input[i][j] === ".") continue;
      let visit = Array.from(Array(r), () => Array(c).fill(false));
      visit[i][j] = true;
      let start = [i, j];
      let cnt = [start];
      dfs(start, visit, cnt);
      if (cnt.length >= 4) {
        res.push(cnt);
        baaam();
      }
    }
  }
}

function baaam() {
  for (let cnt of res) {
    for (let c of cnt) {
      let [x, y] = c;
      input[x][y] = ".";
    }
  }
}

function setDown() {
  for (let i = 0; i < c; i++) {
    let [point, dif] = check(i);
    // console.log(`curr: ${i}`);
    // console.log(`point: `);
    // console.log(point);
    // console.log(`dif: ${dif}`);
    if (dif) {
      let [px, py] = point;
      let j = px;
      while (true) {
        if (j - dif < 0) break;
        input[j][i] = input[j - dif][i];
        j--;
      }
      input[0][i] = ".";
    }
    // console.log(input);
  }
}

function check(c) {
  let point = [];
  let dif = 0;
  for (let i = r - 1; i >= 0; i--) {
    if (!point.length && input[i][c] === ".") {
      point = [i, c];
    }
    if (point.length && input[i][c] !== ".") {
      dif = Math.abs(i - point[0]);
      break;
    }
  }
  return [point, dif];
}

function dfs(start, visit, cnt) {
  let [x, y] = start;
  let letter = input[x][y];
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx >= 0 && ny >= 0 && nx < r && ny < c) {
      if (!visit[nx][ny] && input[nx][ny] === letter) {
        cnt.push([nx, ny]);
        visit[nx][ny] = true;
        dfs([nx, ny], visit, cnt, res);
      }
    }
  }
}
