const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
const table = input[1].split(" ").map((e) => +e);
let sumTable = table.slice();
for (let i = 0; i < sumTable.length; i++) {
  if (!i) continue;
  sumTable[i] += sumTable[i - 1];
}

let answer = "";

for (let i = 2; i < input.length; i++) {
  const [num1, num2] = input[i].split(" ").map((e) => +e - 1);
  if (!num1) {
    answer += sumTable[num2] + "\n";
    continue;
  }
  answer += sumTable[num2] - sumTable[num1 - 1] + "\n";
}

console.log("table:", table);
console.log("sumTable:", sumTable);
console.log(answer.trim());
