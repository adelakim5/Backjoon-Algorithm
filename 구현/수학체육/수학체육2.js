const fs = require("fs");
const input = fs.readFileSync("stdin.txt").toString().trim();
const num = +input;
if (num <= 5) {
  console.log(num);
  return;
}
let res = num % 8;
if (res === 0) {
  console.log(2);
} else if (res === 7) {
  console.log(3);
} else if (res === 6) {
  console.log(4);
} else {
  console.log(res);
}
