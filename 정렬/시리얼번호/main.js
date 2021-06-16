const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");
const tc = +input[0];

const arr = input.slice(1).map((e) => e.replace(/\r/, ""));

arr.sort((a, b) => {
  if (a.length === b.length) {
    const aSum = [...a]
      .filter((item) => item.charCodeAt(0) <= 57)
      .reduce((acc, val) => acc + +val, 0);
    const bSum = [...b]
      .filter((item) => item.charCodeAt(0) <= 57)
      .reduce((acc, val) => acc + +val, 0);
    if (aSum === bSum) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < b[i].charCodeAt(0)) return -1;
        if (a[i].charCodeAt(0) > b[i].charCodeAt(0)) return 1;
      }
    }
    return aSum - bSum;
  }
  return a.length - b.length;
});

console.log(arr.join("\n").trim());

console.log("0".charCodeAt(0));
