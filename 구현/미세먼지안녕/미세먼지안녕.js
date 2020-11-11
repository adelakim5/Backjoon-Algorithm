const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [r, c, t] = input[0].split(" ").map((e) => +e);
let room = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let time = 0;
const cleaner = getCleaner(room);
while (time < t) {
  let dust = getDusts(room);
  room = bfsOfDust(dust, room);
  room = onCleaner(room, cleaner);
  time++;
}

console.log(getSumOfDust(room));

function getSumOfDust(room) {
  let sum = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (room[i][j] > 0) sum += room[i][j];
    }
  }
  return sum;
}

function getCleaner(room) {
  let cleaner = [];
  for (let i = 0; i < r; i++) {
    if (room[i][0] === -1) {
      cleaner.push({ x: i, y: 0 }, { x: i + 1, y: 0 });
      break;
    }
  }
  return cleaner;
}

function getDusts(room) {
  let dusts = [];
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (room[i][j] > 0) {
        dusts.push({ x: i, y: j });
      }
    }
  }
  return dusts;
}

function isInRoom(nx, ny) {
  if (nx >= 0 && nx < r && ny >= 0 && ny < c) return true;
  return false;
}

function setNewRoom(cleaner) {
  let copiedRoom = Array.from(Array(r), () => Array(c).fill(0));
  for (let c of cleaner) {
    copiedRoom[c.x][c.y] = -1;
  }
  return copiedRoom;
}

function bfsOfDust(dusts, room) {
  let copiedRoom = setNewRoom(cleaner);
  let q = [];
  for (let dust of dusts) {
    q.push(dust);
  }
  while (q.length) {
    const past = q.shift();
    let directions = [];
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      const nx = past.x + dx[i];
      const ny = past.y + dy[i];
      if (isInRoom(nx, ny) && room[nx][ny] !== -1) {
        directions.push({ x: nx, y: ny });
      }
    }
    if (!directions.length) continue;
    const dLength = directions.length;
    const dustAmount = room[past.x][past.y];
    const spreadAmount = Math.floor(dustAmount / 5);
    const myAmount = dustAmount - spreadAmount * dLength;
    if (spreadAmount === 0 && myAmount === 0) continue;
    copiedRoom[past.x][past.y] += myAmount;
    for (let j = 0; j < dLength; j++) {
      const x = directions[j].x;
      const y = directions[j].y;
      copiedRoom[x][y] += spreadAmount;
    }
  }
  return copiedRoom;
}

function onCleaner(dustRoom, cleaner) {
  const cleanerTop = cleaner[0];
  const cleanerBottom = cleaner[1];
  if (cleanerTop.x === 0) {
    goRight(cleanerTop.x);
    goUpForBottom();
    goLeft(r - 1);
    goDownForBottom();
    goRight(cleanerBottom.x);
  } else if (cleanerTop.x === 1) {
    goLeft(0);
    goUpForTop();
    goRight(cleanerTop.x);
    goUpForBottom();
    goLeft(r - 1);
    goDownForBottom();
    goRight(cleanerBottom.x);
  } else if (cleanerBottom.x === r - 1) {
    goRight(cleanerBottom.x);
    goDownForTop();
    goLeft(0);
    goUpForTop();
    goRight(cleanerTop.x);
  } else if (cleanerBottom.x === r - 2) {
    goLeft(r - 1);
    goDownForBottom();
    goRight(cleanerBottom.x);
    goDownForTop();
    goLeft(0);
    goUpForTop();
    goRight(cleanerTop.x);
  } else {
    goDownForTop();
    goLeft(0);
    goUpForTop();
    goRight(cleanerTop.x);
    goUpForBottom();
    goLeft(r - 1);
    goDownForBottom();
    goRight(cleanerBottom.x);
  }

  return dustRoom;

  function goDownForTop() {
    for (let i = cleanerTop.x - 1; i >= 0; i--) {
      if (dustRoom[i][0] === 0) continue;
      if (i === cleanerTop.x - 1) dustRoom[i][0] = 0;
      else {
        dustRoom[i + 1][0] = dustRoom[i][0];
        dustRoom[i][0] = 0;
      }
    }
  }

  function goLeft(row) {
    for (let i = 1; i < c; i++) {
      if (dustRoom[row][i] === 0) continue;
      dustRoom[row][i - 1] = dustRoom[row][i];
      dustRoom[row][i] = 0;
    }
  }

  function goUpForTop() {
    for (let i = 1; i <= cleanerTop.x; i++) {
      if (dustRoom[i][c - 1] === 0) continue;
      dustRoom[i - 1][c - 1] = dustRoom[i][c - 1];
      dustRoom[i][c - 1] = 0;
    }
  }

  function goRight(x) {
    for (let i = c - 2; i > 0; i--) {
      if (dustRoom[x][i] === 0) continue;
      dustRoom[x][i + 1] = dustRoom[x][i];
      dustRoom[x][i] = 0;
    }
  }
  function goUpForBottom() {
    for (let i = cleanerBottom.x + 1; i < r; i++) {
      if (dustRoom[i][0] === 0) continue;
      if (i === cleanerBottom.x + 1) dustRoom[i][0] = 0;
      else {
        dustRoom[i - 1][0] = dustRoom[i][0];
        dustRoom[i][0] = 0;
      }
    }
  }
  function goDownForBottom() {
    for (let i = r - 1; i >= cleanerBottom.x; i--) {
      if (dustRoom[i][c - 1] === 0) continue;
      dustRoom[i + 1][c - 1] = dustRoom[i][c - 1];
      dustRoom[i][c - 1] = 0;
    }
  }
}
