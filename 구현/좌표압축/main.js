const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim().split("\n");

const n = +input[0];
const list = input[1].split(" ").map((e) => +e);

const sorted = new Set([...list].sort((a, b) => a - b));
const map = {};
const set = [...sorted];

for (let i = 0; i < set.length; i++) {
  const num = set[i];
  if (map[num]) continue;
  map[num] = i;
}

let result = "";

for (let num of list) {
  result += map[num] + " ";
}

console.log(result.trim());
