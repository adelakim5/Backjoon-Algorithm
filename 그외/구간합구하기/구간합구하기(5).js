const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map((e) => +e);
let tables = [];
for (let i = 1; i <= n; i++) {
  tables.push(input[i].split(" ").map((e) => +e));
}

let sumTables = tables.slice().map((e) => e.slice());
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!i && !j) {
      continue;
    }
    if (!i && j) {
      sumTables[i][j] += sumTables[i][j - 1];
    } else if (i && !j) {
      sumTables[i][j] += sumTables[i - 1][j];
    } else {
      sumTables[i][j] += sumTables[i][j - 1] + sumTables[i - 1][j] - sumTables[i - 1][j - 1];
    }
  }
}

let answer = "";

for (let i = n + 1; i < input.length; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map((e) => +e - 1);
  if (!x1 && !y1) {
    answer += sumTables[x2][y2] + "\n";
    continue;
  }
  if (!x1) {
    answer += sumTables[x2][y2] - sumTables[x2][y1 - 1] + "\n";
  } else if (!y1) {
    answer += sumTables[x2][y2] - sumTables[x1 - 1][y2] + "\n";
  } else {
    answer += sumTables[x2][y2] - sumTables[x2][y1 - 1] - sumTables[x1 - 1][y2] + sumTables[x1 - 1][y1 - 1] + "\n";
  }
}
console.log(sumTables);
console.log(answer.trim());
