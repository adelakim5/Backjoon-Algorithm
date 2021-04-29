const fs = require("fs");
const [a, b] = fs.readFileSync("./stdin.txt").toString().trim().split(" ");

if (a.length === b.length) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) sum++;
  }
  console.log(sum);
  return;
}

const lastIndex = b.length - a.length;
let min = Infinity;
for (let l = 0; l <= lastIndex; l++) {
  let j = 0;
  let sum = 0;
  for (let i = l; i < b.length; i++) {
    if (j >= a.length) break;
    if (b[i] !== a[j]) sum++;
    j++;
  }
  min = Math.min(min, sum);
}

console.log(min);
