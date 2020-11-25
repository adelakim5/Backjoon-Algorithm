const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, s] = input[0].split(" ").map((e) => +e);
const arr = input[1].split(" ").map((e) => +e);
let count = 0;
getPartArr(0, 0);
console.log(count);

function getPartArr(idx, sum) {
  if (sum === s && idx > 0) {
    count++;
  }
  for (let i = idx; i < arr.length; i++) {
    console.log(`111 sum: ${sum}, arr[i]: ${arr[i]}, i: ${i}`);
    getPartArr(++idx, sum + arr[i]);
    console.log(`222 sum: ${sum}, arr[i]: ${arr[i]}, i: ${i}`);
  }
}
