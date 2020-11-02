const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input.splice(0, 1)[0];
const ocean = input.map((e) => e.split(" ").map((i) => +i));
let babySharkSize = 2;
let min = Infinity;
let babyShark = [];
let visit = Array.from(Array(n), () => Array(n).fill(false));
let fish = findFish();
visit[babyShark[0]][babyShark[1]] = true;

if (!fish.length || min >= babySharkSize) {
  console.log(0);
  return;
}

if (fish.length === 1) {
  console.log(bfs(babyShark, fish[0].loc));
  return;
}

let eatenFishCount = 0;

let movedTimeWithDistance = 0;
dfs(babyShark);
// console.log(`babySharkSize: ${babySharkSize}`);
// console.log(babyShark);
// console.log(ocean);
// console.log(visit);
console.log(movedTimeWithDistance);

function dfs(babyShark) {
  const [x, y] = babyShark;
  const sortedFish = sortFishByDist(fish, babyShark);
  for (let i = 0; i < sortedFish.length; i++) {
    let currFish = sortedFish[i];
    if (currFish === undefined) continue;
    if (currFish.length > 1) currFish = sortFishByTopAndLeft(currFish);
    for (let elementFish of currFish) {
      const [nx, ny] = elementFish.loc;
      if (visit[nx][ny] || elementFish.size >= babySharkSize) continue;
      ocean[x][y] = 0;
      visit[nx][ny] = true;
      movedTimeWithDistance += elementFish.dist;
      // console.log(`nx: ${nx}, ny: ${ny}`);
      // console.log(elementFish.dist, movedTimeWithDistance);
      ++eatenFishCount;
      if (eatenFishCount === babySharkSize) {
        ++babySharkSize;
        eatenFishCount = 0;
      }
      dfs([nx, ny]);
    }
  }
}

function sortFishByTopAndLeft(currFish) {
  return currFish.sort((a, b) => {
    if (a.loc[0] === b.loc[0]) {
      return a.loc[1] - b.loc[1];
    }
    return a.loc[0] - b.loc[0];
  });
}

function sortFishByDist(fish, babyShark) {
  let distance = [];
  for (let i = 0; i < fish.length; i++) {
    const [nx, ny] = fish[i].loc;
    if (visit[nx][ny]) continue;
    const dist = bfs(babyShark, [nx, ny]);
    // console.log("fish location:", nx, ny);
    // console.log("dist:", dist);
    fish[i].dist = dist;
    distance[dist] ? distance[dist].push(fish[i]) : (distance[dist] = [fish[i]]);
  }
  return distance;
}

function bfs(babyShark, destinationFish) {
  const [destX, destY] = destinationFish;
  let start = {};
  start.x = babyShark[0];
  start.y = babyShark[1];
  start.d = 0;
  let q = [];
  let visited = Array.from(Array(n), () => Array(n).fill(false));
  visited[start.x][start.y] = true;
  q.push(start);
  while (q.length) {
    let past = q.shift();
    if (past.x === destX && past.y === destY) return past.d;
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    for (let i = 0; i < 4; i++) {
      const nx = past.x + dx[i];
      const ny = past.y + dy[i];
      if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
        if (!visited[nx][ny] && ocean[nx][ny] <= babySharkSize) {
          visited[nx][ny] = true;
          q.push({ x: nx, y: ny, d: past.d + 1 });
        }
      }
    }
  }
}

function findFish() {
  let fish = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (ocean[i][j] !== 0 && ocean[i][j] !== 9 && !visit[i][j]) {
        fish.push({ loc: [i, j], size: ocean[i][j] });
        if (ocean[i][j] < min && !visit[i][j]) min = ocean[i][j];
      }
      if (ocean[i][j] === 9 && !babyShark.length) babyShark = [i, j];
    }
  }
  return fish;
}
