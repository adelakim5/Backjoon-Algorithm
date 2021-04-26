const fs = require("fs");
const input = fs.readFileSync("./stdin.txt").toString().trim();

const obj = {};
for (let i = 0; i < input.length; i++) {
  const str = input[i].toUpperCase();
  if (obj[str]) obj[str]++;
  else obj[str] = 1;
}

const arr = Object.entries(obj).sort((a, b) => a[1] - b[1]);

if (arr.length >= 2 && arr[arr.length - 1][1] === arr[arr.length - 2][1]) console.log("?");
else console.log(arr[arr.length - 1][0]);
