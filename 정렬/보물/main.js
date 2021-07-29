const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const n = +input[0];

const arr = input[1].split(" ").map((e) => +e);
const brr = input[2].split(" ").map((e) => +e);

arr.sort((a, b) => a - b);
brr.sort((a, b) => b - a);

let sum = 0;
for (let i = 0; i < n; i++) {
  sum += arr[i] * brr[i];
}

console.log(sum);
