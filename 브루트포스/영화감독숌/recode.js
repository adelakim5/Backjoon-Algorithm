const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = fs.readFileSync("stdin.txt").toString().trim();
const number = +input;

let i = 666;
let preNum = 0;
let count = 0;
while (count < number) {
  const str = i.toString();
  if (str.includes("666") && preNum < i) {
    preNum = i;
    count++;
  }
  i++;
}

console.log(preNum);
