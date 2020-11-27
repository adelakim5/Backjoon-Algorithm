const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(" ").map(e => +e)
let [n, kim, lim] = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);
// console.log(lim, kim);

let time = 0;
// let answer = 0;
kim--;
lim--;
while (true) {
  kim = Math.floor(kim / 2);
  lim = Math.floor(lim / 2);
  time++;
  if (kim === lim) {
    break;
  }
}
console.log(time);
