const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(e=>+e);
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((e) => +e);
console.log(input);
let test = [];
let testCases = [];
for (let i = 1; i < input.length; i++) {
  test.push(input[i]);
  if (test.length === 2) {
    testCases.push(test);
    test = [];
  }
}

let apt = []
apt[0] = Array(14).
