const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("./stdin.txt").toString().trim().replace(/\r/g, "").split("\n");
const table = {
  black: { val: 0, mult: 1 },
  brown: { val: 1, mult: 10 },
  red: { val: 2, mult: 100 },
  orange: { val: 3, mult: 1000 },
  yellow: { val: 4, mult: 10000 },
  green: { val: 5, mult: 100000 },
  blue: { val: 6, mult: 1000000 },
  violet: { val: 7, mult: 10000000 },
  grey: { val: 8, mult: 100000000 },
  white: { val: 9, mult: 1000000000 },
};

let result = "";

for (let i = 0; i < 3; i++) {
  if (i === 2) {
    console.log(Number(result) * table[input[i]].mult);
    break;
  }
  result += table[input[i]].val;
}
