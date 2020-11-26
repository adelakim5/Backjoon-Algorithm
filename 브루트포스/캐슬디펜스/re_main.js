const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m, d] = input[0].split(" ").map((e) => +e);
const originMap = input.slice(1).map((e) => e.split(" ").map((i) => +i));
// const originEnemyCount = getEnemySize(originMap);
const archers = [];
distribution([], 0);

let totalMax = 0;

for (let archerSet of archers) {
  let tempN = n;
  let maxRemoveEnemyCount = 0;
  let map = originMap.slice().map((e) => [...e]);
  while (tempN > 0) {
    let removeEnemy = [];
    for (let archer of archerSet) {
      // 궁수 세명
      let { r, c } = archer;
      r = tempN;
      let minDist = d;
      let minEnemy = [Infinity, Infinity];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (map[i][j] === 0) continue;
          const dist = Math.abs(r - i) + Math.abs(c - j);
          if (dist > minDist) continue;
          if (minDist > dist || (minDist === dist && j < minEnemy[1])) {
            minDist = dist;
            minEnemy = [i, j];
          }
        }
      } // 궁수 한명이 죽일 적 하나 선택
      if (minEnemy[0] !== Infinity && minEnemy[1] !== Infinity) removeEnemy.push(minEnemy); // 죽일 적 배열에 넣기
    }
    for (let rEnemy of removeEnemy) {
      const [x, y] = rEnemy;
      if (map[x][y] === 1) {
        map[x][y] = 0;
        maxRemoveEnemyCount++;
      }
    }
    for (let j = 0; j < m; j++) {
      if (map[tempN - 1][j] === 1) map[tempN - 1][j] = 0;
    }
    tempN--;
  }
  if (maxRemoveEnemyCount > totalMax) totalMax = maxRemoveEnemyCount;
}
console.log(totalMax);

// function getEnemySize(map) {
//   let size = 0;
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (map[i][j] === 1) size++;
//     }
//   }
//   return size;
// }

function distribution(res, idx) {
  // 궁수 배치
  if (res.length === 3) {
    archers.push([...res]);
    return;
  }

  for (let i = idx; i < m; i++) {
    res.push({ r: n, c: i });
    distribution(res, i + 1);
    res.pop();
  }
}
