const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m, x] = input[0].split(" ").map((e) => +e);
let towns = [];
for (let i = 1; i <= m; i++) {
  towns.push(input[i].split(" ").map((e) => +e));
}

for (let i of towns) {
  const [start, end, time] = i;
}
