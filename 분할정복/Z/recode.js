// 2020-12-23

const fs = require("fs");
const [n, r, c] = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);
const N = Math.pow(2, n);
let totalArr = Array.from(Array(N), () => Array(N));

function find() {}
