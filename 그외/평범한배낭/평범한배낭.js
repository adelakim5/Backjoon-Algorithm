const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, k] = input[0].split(" ").map((e) => +e);
let backpacks = input
  .slice(1)
  .map((e) => e.split(" ").map((i) => +i))
  .sort((a, b) => a[0] - b[0]);
// console.log(backpacks);

let d = Array(k + 1).fill(0);
for (let b of backpacks) {
  const [w, v] = b;
  if (w > k) continue;
  d[w] = v;
}
const start = backpacks[0][0];
for (let i = start + 1; i < d.length; i++) {
  let j = 1;
  let max = d[i];
  while (j <= i - j) {
    const st = d[j];
    const en = d[i - j];
    const sum = i % 2 !== 0 ? st + en : st;
    if (max < sum) max = sum;
    j++;
  }
  d[i] = Math.max(max, d[i], d[i - 1]);
}
console.log(d);
console.log(d[k]);

// 7 19
// 9 89
// 8 80
// 1 32
// 6 68
// 2 74
// 3 42
// 7 2

// let currSum = 0;
// let currVal = 0;
// backTrack(0, currSum, currVal);
// console.log(max);

// function search() {
//     for(let i=0; i<backpacks.length; i++) {
//         const currBackpack = backpacks[i]
//         for(let j=i+1; j<backpacks.length; j++) {
//             if(backpacks[j] + currBackpack <= k) {

//             }
//         }
//     }
//  }

function backTrack(idx, currSum, currVal) {
  // let newBackpacks = [...backpacks]
  for (let i = idx; i < backpacks.length; i++) {
    if (currSum + backpacks[i][0] <= k) {
      currSum += backpacks[i][0];
      currVal += backpacks[i][1];
      if (max < currVal) max = currVal;
      backTrack(idx++, currSum, currVal);
      currSum -= backpacks[i][0];
      currVal -= backpacks[i][1];
    }
  }
}

// 8 1 7 2 6 3 5
// i=1   < 4 => 1,2,3 || 7 6 5
