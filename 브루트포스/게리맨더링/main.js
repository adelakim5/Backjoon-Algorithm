const input = require("fs").readFileSync("stdin.txt").toString().trim().replace(/\r/g, "").split("\n");
const n = +input[0];
const totalAreas = Array(n)
  .fill(0)
  .map((e, i) => i);
const peopleSize = input[1].split(" ").map((e) => +e);
const relationships = input.slice(2).map((e) => e.split(" ").map((f) => +f));
let min = Infinity;
let maxSize = Math.floor(n / 2);
for (let size = 1; size <= maxSize; size++) {
  combinationOfTwoAreas(size, [], 0);
}
console.log(min === Infinity ? -1 : min);

function combinationOfTwoAreas(size, area, idx) {
  if (area.length === size) {
    if (!isConnected(area)) return;
    let otherArea = totalAreas.filter((e) => !area.includes(e));
    if (isConnected(otherArea)) {
      const diff = Math.abs(getSumOfPeopleSize(area) - getSumOfPeopleSize(otherArea));
      min = Math.min(min, diff);
    }
    return;
  }
  for (let i = idx; i < n; i++) {
    area.push(i);
    combinationOfTwoAreas(size, area, i + 1);
    area.pop();
  }
}

function isConnected(area) {
  let visit = Array(n).fill(false);
  const start = area[0];
  visit[start] = true;
  let q = [];
  q.push(start);
  let visitCnt = 1;
  while (q.length) {
    const curr = q.shift();
    const nexts = relationships[curr].slice(1);
    for (let i = 0; i < nexts.length; i++) {
      const next = nexts[i] - 1;
      if (visit[next] === false && area.includes(next)) {
        visit[next] = true;
        visitCnt++;
        q.push(next);
      }
    }
  }
  if (visitCnt === area.length) return true;
  return false;
}

function getSumOfPeopleSize(area) {
  let sum = 0;
  for (let a of area) {
    sum += peopleSize[a];
  }
  return sum;
}
