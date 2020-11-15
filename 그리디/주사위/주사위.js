const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const n = +input[0];
let dice = input
  .slice(1)[0]
  .split(" ")
  .map((i) => +i);

if (n === 1) {
  dice.sort((a, b) => a - b);
  dice.pop();
  console.log(dice.reduce((acc, val) => acc + val));
  return;
}

let arr = [];
arr[0] = [dice[0], dice[5]].sort((a, b) => a - b);
arr[1] = [dice[1], dice[4]].sort((a, b) => a - b);
arr[2] = [dice[2], dice[3]].sort((a, b) => a - b);
let minOne = BigInt((4 * (n - 1) * (n - 2) + (n - 2) * (n - 2)) * Math.min(...dice));
// console.log(`minOne: ${minOne}`);
let min = BigInt(9007199254740991);
// console.log(min);
let minTwoCnt = BigInt(4 * (n - 1) + 4 * (n - 2));
let minThree = BigInt(arr[0][0] + arr[1][0] + arr[2][0]) * BigInt(4);
// console.log(`minThree: ${minThree}`);

for (let i = 0; i < 6; i++) {
  let curr = dice[i];
  for (let j = 0; j < 6; j++) {
    if ((i === 0 || i === 5) && (j === 0 || j === 5)) continue;
    if ((i === 2 || i === 3) && (j === 2 || j === 3)) continue;
    if ((i === 1 || i === 4) && (j === 1 || j === 4)) continue;
    min = BigInt(curr + dice[j]) < min ? BigInt(curr + dice[j]) : min;
  }
}
// console.log(min);
let minTwo = min * minTwoCnt;
console.log((minOne + minTwo + minThree).toString());
