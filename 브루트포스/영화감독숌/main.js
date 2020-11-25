const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const input = fs.readFileSync("stdin.txt").toString().trim();
const number = +input;

let d = [];
let i = 666;
while (true) {
  if (d.length >= number) break;
  const str = i.toString();
  if (str.includes("666") && (d[d.length - 1] < i || !d.length)) d.push(i);
  i++;
}

d.sort((a, b) => a - b);
console.log(d[number - 1]);
// console.log(set);
