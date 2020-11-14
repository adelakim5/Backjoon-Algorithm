const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
const [a, b] = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split(" ")
  .map((e) => +e);

if (a === b) {
  console.log(0);
  return;
}

// let start = a;
let end = b;
let cnt = 1;

while (true) {
  if (end % 2 === 0) {
    end /= 2;
    cnt++;
  } else {
    let str = end.toString();
    if (str[str.length - 1] === "1") {
      end = str.slice(0, str.length - 1) / 1;
      cnt++;
    } else {
      cnt = -1;
      break;
    }
  }
  if (end === a) break;
  if (end < a) {
    cnt = -1;
    break;
  }
}

console.log(cnt);
