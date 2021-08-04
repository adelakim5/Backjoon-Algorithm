const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim();
const n = +input;

let arr = [];
let end = false;
let res = "";
backTrack(1);
console.log(res);

function print(size) {
  for (let i = 1; i < size; i++) {
    res += arr[i].toString();
  }
}

function isGood(start, size) {
  let ans = 0;
  for (let i = start; i < start + size; i++) {
    if (arr[i] === arr[i + size]) ans++;
  }
  if (ans === size) return false;
  return true;
}

function goodCheck(max) {
  for (let i = 1; i <= Math.floor(max / 2); i++) {
    for (let j = 1; j <= max - i * 2 + 1; j++) {
      if (!isGood(j, i)) return false;
    }
  }
  return true;
}

function backTrack(index) {
  let num = 1;
  if (end) return;
  if (index === n + 1 && !end) {
    print(index);
    end = true;
    return;
  }
  while (num <= 3) {
    arr[index] = num;
    if (goodCheck(index)) backTrack(index + 1);
    num++;
  }
}

// 꼭 다시 풀어보자!
