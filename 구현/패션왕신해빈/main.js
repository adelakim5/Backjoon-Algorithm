const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const testCase = +input[0];
let i = 0;

let answer = "";

for (let t = 0; t < testCase; t++) {
  const n = +input[++i];
  const clothesMap = new Map();

  for (let j = 0; j < n; j++) {
    let [item, kind] = input[++i].split(" ");
    kind = kind.replace(/\r/, "");
    if (clothesMap.has(kind)) {
      let value = clothesMap.get(kind);
      value.push(item);
      clothesMap.set(kind, value);
    } else clothesMap.set(kind, [item]);
  }

  let res = 1;
  for (let [key, value] of clothesMap) {
    res *= value.length + 1;
  }

  answer += res - 1 + "\n";
}

console.log(answer.trim());

// 조합 수학 문제였다..
