const fs = require("fs");
const input = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);
const n = BigInt(input[0]);
const m = BigInt(input[1]);
const value = factorial(n) / (factorial(n - m) * factorial(m));
console.log(value.toString());

function factorial(num) {
  if (num === 1n) return 1n;
  return num * factorial(num - 1n);
}
