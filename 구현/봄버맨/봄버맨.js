const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [r, c, n] = input[0].split(" ").map((e) => +e);
const map = input.slice(1, input.length).map((e) =>
  e.split("").map((i) => {
    if (i === "O")
      i = {
        val: i,
        time: 0,
      };
    return i;
  })
);

if (n === 1) {
  printMap(map);
  return;
}

// main
let totalTime = 2;
let d = [];
d[0] = map.slice().map((i) => i.slice());
d[1] = d[0].slice().map((i) => i.slice());
while (totalTime <= 7) {
  if (totalTime > n) break;
  d[totalTime] = fillBombsInMap(d[totalTime - 1], totalTime);
  totalTime++;
  d[totalTime] = explodeBombs(d[totalTime - 1], totalTime);
  totalTime++;
}

if (n > 7) {
  for (let i = 8; i <= n; i++) {
    d[i] = d[i - 4];
  }
}

printMap(d[n]);

function printMap(map) {
  let result = "";
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      map[i][j] === "." ? (result += map[i][j]) : (result += map[i][j].val);
    }
    result += "\n";
  }
  console.log(result.trim());
}

function explodeBombs(map, totalTime) {
  let dMap = map.slice().map((i) => i.slice());
  let q = findBombs(dMap, totalTime);
  while (q.length) {
    let currBomb = q.shift();
    dMap[currBomb.x][currBomb.y] = ".";
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    for (let i = 0; i < 4; i++) {
      const nx = currBomb.x + dx[i];
      const ny = currBomb.y + dy[i];
      if (nx >= 0 && ny >= 0 && nx < r && ny < c) {
        if (dMap[nx][ny] === ".") continue;
        dMap[nx][ny] = ".";
      }
    }
  }
  return dMap;
}

function findBombs(map, totalTime) {
  let q = [];
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] === ".") continue;
      if (map[i][j].val === "O" && map[i][j].time === totalTime - 3)
        q.push({
          x: i,
          y: j,
        });
    }
  }
  return q;
}

function fillBombsInMap(map, totalTime) {
  let dMap = map.slice().map((i) => i.slice());
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (dMap[i][j] === ".")
        dMap[i][j] = {
          val: "O",
          time: totalTime,
        };
    }
  }
  return dMap;
}
