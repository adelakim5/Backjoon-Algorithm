const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const n = +input[0];
let arr = input.slice(1, n + 1).map((e) => e.split(" ").map((i) => +i));
console.log(arr);
let answer = "";

for (let j = 0; j < arr.length; j++) {
  let num = 1;
  const curr = arr[j];
  for (let i = 0; i < arr.length; i++) {
    if (i === j) continue;
    if (curr[0] < arr[i][0] && curr[1] < arr[i][1]) num++;
  }
  answer += num + " ";
}

console.log(answer.trim());
