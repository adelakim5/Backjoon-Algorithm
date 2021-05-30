const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map((e) => +e);
const truth = input[1].split(" ").map((e) => +e);
if (truth[0] === 0) {
  console.log(m);
  return;
}

const start = truth.slice(1);

let knowingPeople = new Set(truth.slice(1));

let cnt = 0;

const g = Array.from(Array(n + 1), () => Array(n + 1).fill(0));

for (let i = 2; i < input.length; i++) {
  const participantsInfo = input[i].split(" ").map((e) => +e);
  if (participantsInfo[0] === 0) continue;
  const participants = participantsInfo.slice(1);
  connectParticipants(participants);
}

collectKnowingPeople();

for (let i = 2; i < input.length; i++) {
  const participantsInfo = input[i].split(" ").map((e) => +e);
  if (participantsInfo[0] === 0) {
    cnt++;
    continue;
  }
  const participants = participantsInfo.slice(1);
  if (!isIncludesKnowingPeople(participants)) cnt++;
}

console.log(cnt);

function isIncludesKnowingPeople(participants) {
  // 아는 사람들이 포함되어있는지 확인
  const knowings = participants.filter((e) => knowingPeople.has(e));
  return knowings.length > 0;
}

function connectParticipants(participants) {
  // 아는 사람과 연결된 사람 체크
  for (let i = 0; i < participants.length - 1; i++) {
    const st = participants[i];
    for (let j = i + 1; j < participants.length; j++) {
      const en = participants[j];
      g[st][en] = 1;
      g[en][st] = 1;
    }
  }
}

function collectKnowingPeople() {
  // 진실을 알게된 모든 사람을 Set에 넣기
  const visited = Array(n + 1).fill(false);
  const stack = [];
  stack.push(...start);
  start.forEach((i) => (visited[i] = true));
  while (stack.length) {
    const curr = stack.pop();
    for (let i = 0; i < g[curr].length; i++) {
      if (g[curr][i] && !visited[i]) {
        stack.push(i);
        knowingPeople.add(i);
        visited[i] = true;
      }
    }
  }
}
