const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim()
const input = fs.readFileSync("stdin.txt").toString().trim();
if (+input < 10) {
  console.log(+input);
  return;
}

let n = input;
let num = +n;
let count = 0;

while (num > 0) {
  const arrN = n.split("");
  //   console.log(`arrN: [${arrN}]`);
  if (check(arrN)) {
    count++;
    // console.log(`check is true, n: ${n}`);
  }
  num--;
  n = num.toString();
  //   console.log(`num: ${num}, n: ${n}`);
}
console.log(count);

function check(arrN) {
  let dif = 11;
  for (let i = 1; i < arrN.length; i++) {
    if (dif === 11) dif = arrN[i - 1] - arrN[i];
    else if (arrN[i - 1] - arrN[i] !== dif) return false;
  }
  return true;
}
