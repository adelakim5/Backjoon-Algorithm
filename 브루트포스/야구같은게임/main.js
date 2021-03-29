const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const arr = input.slice(1).map((e) => e.split(" ").map((i) => +i));
console.log(arr);
