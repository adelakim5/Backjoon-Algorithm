const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const originN = +input[0];
const strOriginN = input[0];
const m = +input[1];
const presentNumber = 100;
if (originN === presentNumber) {
  console.log(0);
  return;
}
const difOfChannel = Math.abs(presentNumber - originN);

if (m === 0) {
  console.log(strOriginN.length < difOfChannel ? strOriginN.length : difOfChannel);
  return;
}

if (m === 10) {
  console.log(difOfChannel);
  return;
}

const brokenNumbers = input[2].split(" ").map((e) => +e);
const results = [];
const minResLength = strOriginN.length > 1 ? strOriginN.length - 1 : strOriginN.length;
const maxResLength = strOriginN.length < 6 ? strOriginN.length + 1 : strOriginN.length;
let min = Infinity;
if (strOriginN.length !== minResLength && strOriginN.length !== maxResLength) getAdjacentNum([], strOriginN.length);
getAdjacentNum([], minResLength);
getAdjacentNum([], maxResLength);
const count = results[0].length + Math.abs(+results[0] - originN);
console.log(Math.min(count, difOfChannel));

function setIntoResults(res) {
  const resN = +res.join("");
  const len = res.length;
  const dif = Math.abs(resN - originN);
  // console.log(`resN: ${resN}`);
  if (dif + len < min) {
    min = dif + len;
    !results.length ? results.push(resN.toString()) : (results[0] = resN.toString());
  }
}

function getAdjacentNum(res, size) {
  if (res.length === size) {
    setIntoResults(res);
    return;
  }
  for (let i = 0; i < 10; i++) {
    if (brokenNumbers.every((e) => e !== i)) {
      res.push(i);
      getAdjacentNum(res, size);
      res.pop();
    }
  }
}
