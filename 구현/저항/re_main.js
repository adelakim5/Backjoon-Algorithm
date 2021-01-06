const fs = require("fs");
// const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const input = fs.readFileSync("./stdin.txt").toString().trim().replace(/\r/g, "").split("\n");

const table = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

let result = "";
for (let i = 0; i < 3; i++) {
  if (i === 2) {
    console.log(Number(result) * Math.pow(10, table.indexOf(input[i])));
    break;
  }
  result += table.indexOf(input[i]);
}
