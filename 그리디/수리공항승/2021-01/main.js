const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, l] = input[0].split(" ").map((e) => +e);
const arr = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b);

let end = 0;
let cnt = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] + 0.5 > end) {
    end = arr[i] - 0.5 + l;
    cnt++;
  }
}
console.log(cnt);
