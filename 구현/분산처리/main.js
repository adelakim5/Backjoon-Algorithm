const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const n = +input[0];
const testcase = input.slice(1).map((e) => e.split(" ").map((i) => +i));
let results = "";
for (let [a, b] of testcase) {
  results += findComputer(a, b) + "\n";
}
console.log(results.trim());

function findComputer(a, b) {
  a = a % 10;
  if (a === 0) return 10;
  if (a === 1 || a === 5 || a === 6) return a;
  if (a === 2) {
    if (b % 4) {
      switch (b % 4) {
        case 1:
          return 2;
        case 2:
          return 4;
        case 3:
          return 8;
      }
    } else return 6;
  }
  if (a === 3) {
    if (b % 4) {
      switch (b % 4) {
        case 1:
          return 3;
        case 2:
          return 9;
        case 3:
          return 7;
      }
    } else return 1;
  }
  if (a === 4) return b % 2 ? 4 : 6;
  if (a === 7) {
    if (b % 4) {
      switch (b % 4) {
        case 1:
          return 7;
        case 2:
          return 9;
        case 3:
          return 3;
      }
    } else return 1;
  }
  if (a === 8) {
    if (b % 4) {
      switch (b % 4) {
        case 1:
          return 8;
        case 2:
          return 4;
        case 3:
          return 2;
      }
    } else return 6;
  }
  if (a === 9) return b % 2 ? 9 : 1;
}
