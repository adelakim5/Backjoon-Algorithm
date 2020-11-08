const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
const coloredPapers = input.slice(1).map((e) => e.split(" ").map((i) => +i));

let background = Array.from(Array(101), () => Array(101).fill(false));
// console.log(coloredPapers);
let result = 0;

for (let paper of coloredPapers) {
  let [y, x] = paper;
  result += fillPaperOnBackground(y, x);
}

console.log(result);

function fillPaperOnBackground(y, x) {
  let cnt = 0;
  for (let i = y; i < y + 10; i++) {
    for (let j = x; j < x + 10; j++) {
      if (background[i][j]) continue;
      background[i][j] = true;
      cnt++;
    }
  }
  return cnt;
}
