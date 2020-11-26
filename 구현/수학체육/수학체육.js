const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim();
// const input = fs.readFileSync("/dev/stdin").toString().trim();
const num = +input;
console.log(num * 2 + num + num);
