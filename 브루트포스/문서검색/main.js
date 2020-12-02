const input = require("fs").readFileSync("stdin.txt").toString().trim().replace(/\r/g, "").split("\n");
let str = input[0];
const word = input[1];

let index = str.indexOf(word);
// console.log(index);
let cnt = 0;
while (index !== -1) {
  str = str.replace(word, " ");
  cnt++;
  index = str.indexOf(word);
}

console.log(cnt);
