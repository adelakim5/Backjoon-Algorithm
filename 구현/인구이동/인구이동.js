const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, l, r] = input[0].split(" ").map((e) => +e);
let a = input.slice(1, input.length).map((e) => e.split(" ").map((i) => +i));
let answer = 0;
let flag = 0;
let unitedNationsAndPeopleSumArr = [];

while (true) {
  let visit = Array.from(Array(n), () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visit[i][j]) continue;
      visit[i][j] = true;
      const start = { x: i, y: j };
      let unitedNations = [start];
      let unitedPeopleSum = [a[i][j]];
      dfs(start, visit, unitedNations, unitedPeopleSum);
      unitedNationsAndPeopleSumArr.push({ nations: unitedNations, people: unitedPeopleSum[0] });
    }
  }
  for (let nationAndPeople of unitedNationsAndPeopleSumArr) {
    const nations = nationAndPeople.nations;
    const people = nationAndPeople.people;
    if (nations.length > 1) {
      distributePeople(people, nations);
      flag++;
    }
  }
  if (!flag) break;
  answer++;
  flag = 0;
  unitedNationsAndPeopleSumArr = [];
}

console.log(answer);

function dfs(start, visit, unitedNations, unitedPeopleSum) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  for (let i = 0; i < 4; i++) {
    const nx = start.x + dx[i];
    const ny = start.y + dy[i];
    if (!isInMap(nx, ny) || visit[nx][ny]) continue;
    const diff = Math.abs(a[start.x][start.y] - a[nx][ny]);
    if (!isPossibleToBeUnited(diff)) continue;
    visit[nx][ny] = true;
    unitedNations.push({ x: nx, y: ny });
    unitedPeopleSum[0] += a[nx][ny];
    dfs({ x: nx, y: ny }, visit, unitedNations, unitedPeopleSum);
  }
  return;
}

function isInMap(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < n) return true;
  return false;
}

function distributePeople(unitedPeopleSum, unitedNations) {
  const peopleSize = Math.floor(unitedPeopleSum / unitedNations.length);
  for (let nation of unitedNations) {
    a[nation.x][nation.y] = peopleSize;
  }
}

function isPossibleToBeUnited(diff) {
  if (diff <= r && diff >= l) return true;
  return false;
}
