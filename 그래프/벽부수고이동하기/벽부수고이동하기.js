const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
input[0] = input[0].split(" ");
const n = +input[0][0];
const m = +input[0][1];

if (n === 1) {
  console.log(m);
  return;
}

if (m === 1) {
  console.log(n);
  return;
}

let walls = [];
for (let i = 1; i <= n; i++) {
  walls.push(input[i].split(""));
}

let visited = initVisit();

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

let start = {
  coord: [0, 0],
  cnt: 1,
};
let last = {
  coord: [n - 1, m - 1],
  cnt: 0,
};

visited[0][0] = true;

let destroyCount = 0;
let min = Infinity;
let results = [];
let impossibleCount = [0];

dfs(start, visited, destroyCount, results, impossibleCount);

if (results.length === 1) {
  console.log(result[0]);
  return;
}

console.log(results[results.length - 1]);

function initVisit() {
  let visited = [];
  for (let i = 0; i < n; i++) {
    visited.push(Array(m).fill(false));
  }
  return visited;
}

function dfs(curr, visited, destroyCount, results, impossibleCount) {
  //   let flag = false;
  //   console.log("---------------");
  //   console.log("curr:", curr);
  //   console.log("impossibleCount:", impossibleCount);
  if (curr.coord[0] === last.coord[0] && curr.coord[1] === last.coord[1]) {
    if (min > curr.cnt) {
      min = curr.cnt;
      results.push(min);
    }
    // console.log("##### results(before return):", results);
    return;
  }
  let x = curr.coord[1];
  let y = curr.coord[0];
  for (let i = 0; i < 4; i++) {
    let nextX = x + dx[i];
    let nextY = y + dy[i];
    if (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n) {
      let nextCurr = {
        coord: [nextY, nextX],
        cnt: 0,
      };
      //   console.log("nextCurr:", nextCurr);
      //   console.log("walls?", walls[nextY][nextX]);
      if (walls[nextY][nextX] === "0") {
        // console.log("---------------");
        // console.log("if 0 ?");
        if (!visited[nextY][nextX]) {
          //   console.log("if !visited? ");
          //   flag = true;
          visited[nextY][nextX] = true;
          //   console.log("visited:", visited);
          nextCurr.cnt = curr.cnt + 1;
          dfs(nextCurr, visited, destroyCount, results, impossibleCount);
          visited[nextY][nextX] = false;
          //   nextCurr.cnt = curr.cnt - 1
        } else continue;
      } else if (walls[nextY][nextX] === "1" && destroyCount === 0) {
        // console.log("---------------");
        // console.log("if 1 && destroyCount === 0 ?");
        if (!visited[nextY][nextX]) {
          //   console.log("if !visited? ");
          //   flag = true;
          visited[nextY][nextX] = true;
          destroyCount++;
          //   console.log("visited:", visited, "destroyCount:", destroyCount);
          nextCurr.cnt = curr.cnt + 1;
          dfs(nextCurr, visited, destroyCount, results, impossibleCount);
          visited[nextY][nextX] = false;
          destroyCount--;
        } else continue;
      } else if (walls[nextY][nextX] === "1" && destroyCount > 0) {
        // console.log("---------------");
        impossibleCount[0]++;
        // console.log("impossibleCount?", impossibleCount[0]);
        if (impossibleCount[0] === 2) {
          //   console.log("impossibleCount === 2");
          impossibleCount[0] = 0;
          if (!results.length) results.push(-1);
          //   results.push(-1);
          //   console.log("push -1 result:", results);
          return;
        }
      }
    }
  }
}
