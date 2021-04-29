const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim();
const arr = [...input]
  .map((e) => +e)
  .sort((a, b) => b - a)
  .join("");
console.log(arr);
