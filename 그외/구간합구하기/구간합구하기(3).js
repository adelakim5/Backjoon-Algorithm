const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
let origin = [];
for (let i = 1; i <= n; i++) {
  origin.push(input[i].split(" ").map((e) => +e));
}

let sumOfOrigin = origin.slice().map((e) => e.slice());
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!i && !j) continue;
    if (!i && j) {
      sumOfOrigin[i][j] += sumOfOrigin[i][j - 1];
    } else if (i && !j) {
      sumOfOrigin[i][j] += sumOfOrigin[i - 1][j];
    } else {
      sumOfOrigin[i][j] += sumOfOrigin[i - 1][j] + sumOfOrigin[i][j - 1] - sumOfOrigin[i - 1][j - 1];
    }
  }
}

let answer = "";

for (let i = n + 1; i < input.length; i++) {
  console.log("sumOfOrigin", sumOfOrigin);
  input[i] = input[i].split(" ").map((e) => +e);
  if (!input[i][0]) {
    // w가 0이면
    let [w, x, y, c] = input[i];
    x--;
    y--;
    const diff = c - origin[x][y];
    for (let r = x; r < n; r++) {
      for (let c = y; c < n; c++) {
        sumOfOrigin[r][c] += diff;
      }
    }
  } else {
    // w가 1이면
    let [w, x1, y1, x2, y2] = input[i];
    x1--;
    y1--;
    x2--;
    y2--;
    if (!x1 && !y1) {
      answer += sumOfOrigin[x2][y2] + "\n";
      continue;
    }
    if (!x1) {
      answer += sumOfOrigin[x2][y2] - sumOfOrigin[x2][y1 - 1] + "\n";
    } else if (!y1) {
      answer += sumOfOrigin[x2][y2] - sumOfOrigin[x1 - 1][y2] + "\n";
    } else {
      answer += sumOfOrigin[x2][y2] - sumOfOrigin[x2][y1 - 1] - sumOfOrigin[x1 - 1][y2] + sumOfOrigin[x1 - 1][y1 - 1] + "\n";
    }
  }
}

console.log(answer);
