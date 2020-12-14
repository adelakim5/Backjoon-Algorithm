const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const city = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let diffMin = Infinity;

for (let x = 1; x <= n; x++) {
  for (let y = 1; y <= n; y++) {
    let distances = getDistances(x, y);
    for (let [d1, d2] of distances) {
      let area = distrubuteAreas(x, y, d1, d2);
      // console.log(area);
      calculatePeopleSize(city, area);
    }
  }
}
console.log(diffMin);

function calculatePeopleSize(city, area) {
  let cnts = Array(5).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (area[i][j] === 1) cnts[0] += city[i][j];
      else if (area[i][j] === 2) cnts[1] += city[i][j];
      else if (area[i][j] === 3) cnts[2] += city[i][j];
      else if (area[i][j] === 4) cnts[3] += city[i][j];
      else cnts[4] += city[i][j];
    }
  }
  const max = Math.max(...cnts);
  const min = Math.min(...cnts);
  if (diffMin > max - min) diffMin = max - min;
}

function distrubuteAreas(x, y, d1, d2) {
  let area = setBoundary(x, y, d1, d2);
  for (let num = 1; num < 5; num++) {
    switch (num) {
      case 1:
        for (let i = 1; i < x + d1; i++) {
          for (let j = 1; j <= y; j++) {
            if (area[i - 1][j - 1] === 5) break;
            area[i - 1][j - 1] = num;
          }
        }
        break;
      case 2:
        for (let i = x + d2; i >= 1; i--) {
          for (let j = n; j > y; j--) {
            if (area[i - 1][j - 1] === 5) break;
            area[i - 1][j - 1] = num;
          }
        }
        break;
      case 3:
        for (let i = x + d1; i <= n; i++) {
          for (let j = 1; j < y - d1 + d2; j++) {
            if (area[i - 1][j - 1] === 5) break;
            area[i - 1][j - 1] = num;
          }
        }
        break;
      case 4:
        for (let i = n; i > x + d2; i--) {
          for (let j = n; j >= y - d1 + d2; j--) {
            if (area[i - 1][j - 1] === 5) break;
            area[i - 1][j - 1] = num;
          }
        }
        break;
    }
  }
  return area;
}

function setBoundary(x, y, d1, d2) {
  let area = Array.from(Array(n), () => Array(n).fill(0));
  dfs(x, y, x + d1, [1, -1], area);
  dfs(x, y, x + d2, [1, 1], area);
  dfs(x + d1, y - d1, x + d1 + d2, [1, 1], area);
  dfs(x + d2, y + d2, x + d2 + d1, [1, -1], area);
  return area;
}

function dfs(x, y, end, values, area) {
  if (x > end) return;
  area[x - 1][y - 1] = 5;
  dfs(x + values[0], y + values[1], end, values, area);
}

function getDistances(x, y) {
  let array = [];
  for (let d1 = 1; d1 < n; d1++) {
    for (let d2 = 1; d2 < n; d2++) {
      if (x < x + d1 + d2 && x + d1 + d2 <= n && 1 <= y - d1 && y - d1 < y && y < y + d2 && y + d2 <= n) array.push([d1, d2]);
    }
  }
  return array;
}
