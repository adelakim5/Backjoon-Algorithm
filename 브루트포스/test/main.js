const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const arr = input.slice(1).map((e) => e.replace(/\r/g, ""));
let s = "";
let hd = 0;

for (let j = 0; j < m; j++) {
  const cnts = count(arr, j);
  let maxIdx = getMax(cnts);
  if (maxIdx === 0) {
    s += "A";
  } else if (maxIdx === 1) {
    s += "C";
  } else if (maxIdx === 2) {
    s += "G";
  } else {
    s += "T";
  }
  hd += getHd(maxIdx, cnts);
}

console.log(`${s}\n${hd}`);

function count(arr, j) {
  let cnts = Array(4).fill(0);
  for (let i = 0; i < n; i++) {
    switch (arr[i][j]) {
      case "A":
        cnts[0]++;
        break;
      case "C":
        cnts[1]++;
        break;
      case "G":
        cnts[2]++;
        break;
      case "T":
        cnts[3]++;
        break;
    }
  }
  return cnts;
}

function getMax(arr) {
  let maxVal = 0;
  let maxIdx = 0;
  for (let i = 0; i < arr.length; i++) {
    if (maxVal < arr[i]) {
      maxVal = arr[i];
      maxIdx = i;
    }
  }
  return maxIdx;
}

function getHd(maxIdx, arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i === maxIdx) continue;
    sum += arr[i];
  }
  return sum;
}
