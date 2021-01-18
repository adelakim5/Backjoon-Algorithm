const fs = require("fs");
// const input = fs.readFileSync("./stdin.txt").toString().replace(/\r/g, "").trim().split("\n");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");
const [n, m] = input[0].split(" ").map((e) => +e);
let obj = {};
let answer = "";
for (let i = 1; i <= n; i++) {
  let [site, pwd] = input[i].split(" ");
  obj[site] = pwd;
}

for (let i = n + 1; i <= n + m; i++) {
  let site = input[i];
  if (obj[site]) answer += obj[site] + "\n";
}

console.log(answer.trim());

// object 연습
// let object = {};
// object["f"] = "boo";
// let f = "f";
// let g = "g";
// console.log(object[g]);
