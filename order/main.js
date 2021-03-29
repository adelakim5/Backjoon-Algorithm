const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim().replace(/\r/g, "").split("\n");
const testCaseCnt = +input[0];
const tests = input.slice(1);
let res = "";

for (let i = 0; i < testCaseCnt; i += 4) {
  const memo1 = tests[i + 1]
    .split(" ")
    .map((e) => +e)
    .sort((a, b) => a - b);
  const memo2 = tests[i + 3].split(" ").map((e) => +e);
  for (let num of memo2) {
    let flag = false;
    let st = 0;
    let en = memo1.length - 1;
    while (st <= en) {
      const mid = Math.floor((st + en) / 2);
      if (num > memo1[mid]) {
        st = mid + 1;
      } else if (num < memo1[mid]) {
        en = mid - 1;
      } else {
        res += `1\n`;
        flag = true;
        break;
      }
    }
    if (!flag) res += `0\n`;
  }
}

console.log(res.trim());
