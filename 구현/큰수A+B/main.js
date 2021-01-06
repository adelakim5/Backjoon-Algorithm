const fs = require("fs");
let [a, b] = fs.readFileSync("./stdin.txt").toString().trim().split(" ");
// let [a, b] = fs.readFileSync("dev/stdin").toString().trim().split(" ");
a = a.split("");
b = b.split("");

console.log(a.length > b.length ? adder(b, a) : adder(a, b));

function adder(shortArr, longArr) {
  let result = "";
  let [short_idx, long_idx] = [shortArr.length - 1, longArr.length - 1];
  let [carry, sum] = [0, 0];
  while (short_idx >= 0) {
    [carry, sum] = fullAdder(shortArr[short_idx], longArr[long_idx], carry);
    result = sum + result;
    short_idx--;
    long_idx--;
  }
  if (shortArr.length < longArr.length) {
    const startIdx = longArr.length - shortArr.length - 1;
    result = remainAdder(carry, longArr, startIdx) + result;
  } else result = carry > 0 ? carry + result : result;

  return result;
}

function fullAdder(a, b, carry) {
  const temp = [a, b, carry].reduce((acc, val) => acc + Number(val), 0).toString();
  return temp.length < 2 ? [0, +temp[0]] : [+temp[0], +temp[1]];
}

function halfAdder(a, b) {
  const temp = (Number(a) + Number(b)).toString();
  return temp.length < 2 ? [0, +temp] : [+temp[0], +temp[1]];
}

function remainAdder(carry, longArr, startIdx) {
  let result = "";
  for (let i = startIdx; i >= 0; i--) {
    [carry, sum] = halfAdder(longArr[i], carry);
    result = sum + result;
  }
  result = carry > 0 ? carry + result : result;
  return result;
}
