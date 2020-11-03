const fs = require("fs");
// const [n, k] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(e => +e);
const [n, k] = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ")
  .map((e) => +e);

// console.log(n, k);

let answer = -1;
let numberLength = (n) => {
  return n.toString().length;
};

let nLength = getLength(numberLength(n), n);
//   console.log(nLength);
if (isShorterThanN(k, nLength)) {
  answer = k < 10 ? k : getKNumber(k, n);
}

console.log(answer);

function getKNumber(k, n) {
  if (k >= 10 && k <= 189) return findNumber(10, n, k, 10, 2);
  if (k >= 190 && k <= 2889) return findNumber(100, n, k, 190, 3);
  if (k >= 2890 && k <= 38889) return findNumber(1000, n, k, 2890, 4);
  if (k >= 38890 && k <= 488889) return findNumber(10000, n, k, 38890, 5);
  if (k >= 488890 && k <= 5888889) return findNumber(100000, n, k, 488890, 6);
  if (k >= 5888890 && k <= 68888889) return findNumber(1000000, n, k, 5888890, 7);
  if (k >= 68888890 && k <= 788888889) return findNumber(10000000, n, k, 68888890, 8);
  return findNumber(100000000, n, k, 788888890, 9);
}

function getLength(numberLength, n) {
  let initLength = 0;
  switch (numberLength) {
    case 1:
      initLength = 1 * n;
      break;
    case 2:
      initLength = 9;
      initLength += 2 * (n - 10 + 1);
      break;
    case 3:
      initLength = 189;
      initLength += 3 * (n - 100 + 1);
      break;
    case 4:
      initLength = 2889;
      initLength += 4 * (n - 1000 + 1);
      break;
    case 5:
      initLength = 38889;
      initLength += 5 * (n - 10000 + 1);
      break;
    case 6:
      initLength = 488889;
      initLength += 6 * (n - 100000 + 1);
      break;
    case 7:
      initLength = 5888889;
      initLength += 7 * (n - 1000000 + 1);
      break;
    case 8:
      initLength = 68888889;
      initLength += 8 * (n - 10000000 + 1);
      break;
    case 9:
      initLength = 788888889 + 9;
      break;
  }
  return initLength;
}

function isShorterThanN(k, nLength) {
  if (k > nLength) return false;
  return true;
}

function findNumber(idx, n, k, initNumber, size) {
  //   console.log(`idx: ${idx}, n: ${n}, k:${k}, initNumber: ${initNumber}, size: ${size}`);
  let len = 0;
  let lastIndex = 0;
  for (let i = idx; i <= n; i++) {
    // console.log(`i: ${i}`);
    len += size;
    lastIndex = len - 1;
    if (lastIndex >= k - initNumber) {
      let iArr = i.toString().split("");
      let diff = lastIndex - (k - initNumber);
      return iArr[iArr.length - 1 - diff];
    }
  }
}
