const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

let sum = 0;
const people = input[1]
  .split(" ")
  .map((e) => +e)
  .sort((a, b) => a - b)
  .reduce((acc, val) => {
    acc += val;
    sum += acc;
    return acc;
  }, 0);

console.log(sum);
