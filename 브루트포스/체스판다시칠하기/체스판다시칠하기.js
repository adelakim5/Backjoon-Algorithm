const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const originChess = input.slice(1).map((e) => e.split(""));

let min = Infinity;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    let start = [i, j];
    let last = [i + 7, j + 7];
    if (isInChess(i, j) && isInChess(i + 7, j + 7)) {
      const whiteCnt = whiteFirst(start, last);
      const blackCnt = blackFirst(start, last);
      min = Math.min(min, whiteCnt, blackCnt);
    }
  }
}

console.log(min);

function isInChess(nx, ny) {
  if (nx >= 0 && ny >= 0 && nx < n && ny < m) return true;
  return false;
}

function whiteFirst(start, last) {
  let count = 0;
  let chess = originChess.slice().map((e) => [...e]);
  let [sx, sy] = start;
  let [lx, ly] = last;
  for (let i = sx; i <= lx; i++) {
    for (let j = sy; j <= ly; j++) {
      if ((i - sx) % 2 === 0) {
        if ((j - sy) % 2 === 0) {
          if (chess[i][j] === "B") {
            chess[i][j] = "W";
            count++;
          }
        } else {
          if (chess[i][j] === "W") {
            chess[i][j] = "B";
            count++;
          }
        }
      } else {
        if ((j - sy) % 2 === 0) {
          if (chess[i][j] === "W") {
            chess[i][j] = "B";
            count++;
          }
        } else {
          if (chess[i][j] === "B") {
            chess[i][j] = "W";
            count++;
          }
        }
      }
    }
  }
  return count;
}

function blackFirst(start, last) {
  let count = 0;
  let chess = originChess.slice().map((e) => [...e]);
  let [sx, sy] = start;
  let [lx, ly] = last;
  for (let i = sx; i <= lx; i++) {
    for (let j = sy; j <= ly; j++) {
      if ((i - sx) % 2 === 0) {
        if ((j - sy) % 2 === 0) {
          if (chess[i][j] === "W") {
            chess[i][j] = "B";
            count++;
          }
        } else {
          if (chess[i][j] === "B") {
            chess[i][j] = "W";
            count++;
          }
        }
      } else {
        if ((j - sy) % 2 === 0) {
          if (chess[i][j] === "B") {
            chess[i][j] = "W";
            count++;
          }
        } else {
          if (chess[i][j] === "W") {
            chess[i][j] = "B";
            count++;
          }
        }
      }
    }
  }
  return count;
}
