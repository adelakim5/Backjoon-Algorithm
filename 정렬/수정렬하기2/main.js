const fs = require("fs");
const input = fs
  .readFileSync("./stdin.txt")
  .toString()
  .trim()
  .split("\n")
  .map((e) => +e);
const n = input[0];
const arr = input.slice(1);

const answer = arr
  .sort((a, b) => a - b)
  .reduce((acc, val) => {
    acc += `${val}\n`;
    return acc;
  }, ``);

console.log(answer.trim());
