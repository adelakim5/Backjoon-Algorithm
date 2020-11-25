const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const originLab = input.slice(1).map((e) => e.split(" ").map((i) => +i));
const virus = getVirus(originLab);
const empty = countEmpty(originLab);
if (!empty) {
  console.log(0);
  return;
}
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];
let combinedVirus = [];
combinationVirus(0, []);

let minTime = Infinity;
for (let cVirus of combinedVirus) {
  let time = -1;
  let visit = Array.from(Array(n), () => Array(n).fill(0));
  let flag = false;
  [time, flag] = bfs(cVirus, visit, time);
  if (flag && time > -1 && minTime > time) minTime = time;
}
console.log(minTime === Infinity ? -1 : minTime);

function countEmpty(lab) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (lab[i][j] === 0) count++;
    }
  }
  return count;
}

function bfs(viruses, visit, time) {
  let fulfill = 0;
  let q = [...viruses];
  while (q.length) {
    let [i, j, t] = q.shift();
    visit[i][j] = 1;
    for (let k = 0; k < 4; k++) {
      const nx = i + dx[k];
      const ny = j + dy[k];
      if (isInLab(nx, ny) && (!originLab[nx][ny] || originLab[nx][ny] === 2) && !visit[nx][ny]) {
        visit[nx][ny] = 1;
        if (t + 1 > time) time = t + 1;
        if (originLab[nx][ny] === 0) {
          fulfill++;
          if (fulfill === empty) return [time, true];
        }
        q.push([nx, ny, t + 1]);
      }
    }
  }
  if (fulfill === empty) return [time, true];
  else return [time, false];
}

function isInLab(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < n) return true;
  return false;
}

function combinationVirus(idx, res) {
  if (res.length === m) {
    combinedVirus.push([...res]);
    return;
  }
  for (let i = idx; i < virus.length; i++) {
    res.push(virus[i]);
    combinationVirus(i + 1, res);
    res.pop();
  }
}

function getVirus(lab) {
  let virus = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (lab[i][j] === 2) virus.push([i, j, 0]);
    }
  }
  return virus;
}
