const fs = require("fs");
const [n, k] = fs
  .readFileSync("./stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);

// const [n, k] = fs
//   .readFileSync("dev/stdin")
//   .toString()
//   .trim()
//   .split(" ")
//   .map((e) => +e);

let addedN = n;
while (true) {
  if (count(addedN) <= k) break; // 다 합치고 남은 물병이 k와 같거나 작으면 멈춤
  addedN++; // 물병 구매
}
console.log(addedN - n);

function count(n) {
  let cnt = 0;
  while (n > 0) {
    if (n % 2) cnt++; // 이진법 표현시 1이 되는 부분
    n = Math.floor(n / 2);
  }
  return cnt;
}

// let waterSize = 1;
// let count = 0;
// while (n > k) {
//   if (n % 2) {
//     count += waterSize;
//     n++;
//   }
//   n /= 2;
//   waterSize *= 2;
// }

// console.log(count);
