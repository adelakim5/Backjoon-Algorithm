const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const n = +input[0];
let result = "";
for (let i = 1; i <= n; i++) {
  let [a, b] = input[i].split(" ").map((e) => +e);
  result += `${findComputer(a, b)}\n`;
}
console.log(result.trim());

function findComputer(a, b) {
  a %= 10;
  if (a === 0) return 10;
  if (a === 1 || a === 5 || a === 6) return a;
  if (a === 2 || a === 3 || a === 7 || a === 8) return getAnswer(b, a, 4);
  if (a === 4 || a === 9) return getAnswer(b, a, 2);
}

function getAnswer(b, a, mod) {
  if (b % mod === 0) return a % 2 ? 1 : 6;
  const temp = Math.pow(a, b % mod).toString();
  return temp[temp.length - 1];
}
