const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const n = +input[0];
const arr = input.slice(1).map((e) => +e);

let max = [];
let min = [];
let answer = "";

for (let i = 0; i < arr.length; i++) {
  if (i === 0) max.push(arr[i]);
  else {
    if (max.length > min.length) {
      if (max[0] < arr[i]) min.push(arr[i]);
      else {
        let x = max[0];
        min.push(x);
        max[0] = arr[i];
      }
    } else {
      if (min[0] < arr[i]) {
        let x = min[0];
        max.push(x);
        min[0] = arr[i];
      } else {
        max.push(arr[i]);
      }
    }
  }
  answer += max[0] + "\n";
}
console.log(answer.trim());
