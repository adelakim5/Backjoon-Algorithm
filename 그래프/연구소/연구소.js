const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const nm = input.shift().split(" ");
const n = +nm[0];
const m = +nm[1];
// console.log("n:", n, "m:", m);
let lab = [];
for (let i = 0; i < n; i++) {
  lab.push(input[i].split(" "));
}
// console.log("lab:", lab);

const wallCnt = 3;
const safeZones = getSafeZonesAndVirusZones(lab).safe; // 안전지대 좌표 구하기
const virusZones = getSafeZonesAndVirusZones(lab).virus; // 바이러스 좌표 구하기
// console.log("safeZones:", safeZones);
// console.log("virusZones:", virusZones);
let result = [];
let wallLocations = [];
let index = [0];
getSpotsForWalls(safeZones, result, wallLocations, index); // 벽을 세울 수 있는 좌표의 조합 구하기
// console.log("wallLocations:", wallLocations);
let max = 0;
for (let eachWalls of wallLocations) {
  // 각 조합별로 벽 세우기
  const safeZonesCount = safeZones.length - wallCnt; // 안전지대 개수 구하기
  //   console.log("safeZonesCount", safeZonesCount);
  const finalSafeZonesCnt = getSafeZonesCntAfterInfection(eachWalls, lab, safeZonesCount, virusZones); // 벽 세운 후 안전지대 개수 구하기
  if (max >= finalSafeZonesCnt) continue;
  max = finalSafeZonesCnt; // 개수가 가장 큰 값
}

console.log(max);

function getSafeZonesAndVirusZones(lab) {
  let safeZones = [];
  let virusZones = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (lab[i][j] === "0") {
        const str = i + " " + j;
        safeZones.push(str);
      } else if (lab[i][j] === "2") {
        virusZones.push([i, j]);
      }
    }
  }
  return {
    safe: safeZones,
    virus: virusZones,
  };
}

function getSpotsForWalls(safeZones, result, wallLocations, index) {
  //   console.log("Result:", result);
  //   console.log(`safeZones: ${safeZones}, result: ${result}, wallLocations: ${wallLocations}`);
  if (result.length === wallCnt) {
    wallLocations.push(result.map((e) => e.split(" ")));
    return;
  }

  let copyIndex = index.slice();
  const newIndex = copyIndex[0];
  for (let i = newIndex; i < safeZones.length; i++) {
    if (result.length && result[result.length - 1] === safeZones[i]) continue;
    if (!result.length || checkReduplication(result, safeZones[i])) {
      result.push(safeZones[i]);
      ++copyIndex[0];
      getSpotsForWalls(safeZones, result, wallLocations, copyIndex);
      result.pop();
    }
  }
}

function checkReduplication(result, str) {
  for (let i = 0; i < result.length; i++) {
    if (result[i] === str) return false;
  }
  return true;
}

function constructWalls(lab, eachWalls) {
  for (let wall of eachWalls) {
    const x = +wall[1];
    const y = +wall[0];
    lab[y][x] = "1";
  }
  return lab;
}

function createVisit(n, m, virusZones) {
  let visit = Array.from(Array(n), () => Array(m).fill(false));
  if (virusZones.length) {
    for (let v of virusZones) {
      const y = v[0];
      const x = v[1];
      visit[y][x] = true;
    }
  }
  return visit;
}

function getSafeZonesCntAfterInfection(eachWalls, lab, safeZonesCount, virusZones) {
  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];
  let copyLab = lab.slice().map((e) => e.slice());
  let currLab = constructWalls(copyLab, eachWalls);
  //   console.log("virusZones:", virusZones);
  let q = virusZones.slice();
  let visit = createVisit(n, m, virusZones);
  //   console.log("visit:", visit);
  while (q.length) {
    // console.log("currLab:", currLab);
    const past = q.shift();
    for (let i = 0; i < 4; i++) {
      const ny = past[0] + dy[i];
      const nx = past[1] + dx[i];
      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        if (currLab[ny][nx] === "0" && !visit[ny][nx]) {
          currLab[ny][nx] = "2";
          visit[ny][nx] = true;
          q.push([ny, nx]);
          safeZonesCount--;
        }
      }
    }
  }
  //   console.log("safeZonesCount:", safeZonesCount, "currLab:", currLab);
  return safeZonesCount;
}
