const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n")
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m, d] = input[0].split(" ").map((e) => +e);
const originMap = input.slice(1).map((e) => e.split(" ").map((i) => +i));
const originEnemyCount = getEnemySize(originMap);
const archerSize = 3;
let archers = [];
distribution([], 0);
// console.log(archers);

let totalMax = 0;
for (let archSet of archers) {
  let map = originMap.slice().map((e) => [...e]);
  let enemyCount = originEnemyCount;
  let max = 0;
  while (enemyCount > 0) {
    let removeEnemy = new Set();
    for (let eachArch of archSet) {
      // 궁수 세명
      let { r, c } = eachArch; // 그중 궁수 한명
      //   console.log(r, c);
      let min = d;
      let minEnemy = [Infinity, Infinity];
      for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j < m; j++) {
          if (map[i][j] === 1) {
            const dist = Math.abs(i - r) + Math.abs(j - c); // 거리 체크
            if (dist > min) continue;
            if (min > dist || (min === dist && minEnemy[1] > j)) {
              min = dist;
              minEnemy = [i, j]; // 일단 얘가 제일 작다고 취급
            }
          }
        }
      }
      if (minEnemy[0] !== Infinity && minEnemy[1] !== Infinity) removeEnemy.add(minEnemy.join(" "));
    } // 궁수 세명이서 한번씩 적 공격 끝냄
    max += removeEnemy.size;
    for (let rEnemy of removeEnemy) {
      let [x, y] = rEnemy.split(" ").map((e) => +e);
      map[x][y] = 0;
      enemyCount--;
    }
    for (let j = 0; j < m; j++) {
      if (map[n - 1][j] === 1) enemyCount--;
    }
    map = setDown(map); // 적 아래로 이동
  }
  if (max > totalMax) totalMax = max;
}

console.log(totalMax);

function setDown(map) {
  for (let x = n - 2; x >= 0; x--) {
    for (let y = 0; y < m; y++) {
      map[x + 1][y] = map[x][y];
      map[x][y] = 0;
    }
  }
  return map;
}

function getEnemySize(map) {
  let size = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 1) size++;
    }
  }
  return size;
}

function distribution(res, idx) {
  // 궁수 배치
  if (res.length === archerSize) {
    archers.push([...res]);
    return;
  }

  for (let i = idx; i < m; i++) {
    res.push({ r: n, c: i });
    distribution(res, i + 1);
    res.pop();
  }
}
