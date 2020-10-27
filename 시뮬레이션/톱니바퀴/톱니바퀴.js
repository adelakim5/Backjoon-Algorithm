const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
let [a, b, c, d] = input.splice(0, 4).map((e) => e.split(""));
const k = input[0];
for (let i = 1; i <= k; i++) {
  let [gear, direct] = input[i].split(" ").map((e) => +e);
  if (gear === 1) {
    if (isSame(a, b)) {
      a = direct === 1 ? turnRight(a) : turnLeft(a);
    } else {
      if (direct === 1) {
        a = turnRight(a);
        if (!isSame(b, c)) {
          if (!isSame(c, d)) d = turnLeft(d);
          c = turnRight(c);
        }
        b = turnLeft(b);
      } else {
        a = turnLeft(a);
        if (!isSame(b, c)) {
          if (!isSame(c, d)) d = turnRight(d);
          c = turnLeft(c);
        }
        b = turnRight(b);
      }
    }
  } else if (gear === 2) {
    if (isSame(a, b) && isSame(b, c)) {
      // a, c 둘다 같은 극,
      b = direct === 1 ? turnRight(b) : turnLeft(b);
    } else if (!isSame(a, b) && !isSame(b, c)) {
      // 둘다 다른극,
      if (direct === 1) {
        a = turnLeft(a);
        b = turnRight(b);
        if (!isSame(c, d)) d = turnRight(d);
        c = turnLeft(c);
      } else {
        a = turnRight(a);
        b = turnLeft(b);
        if (!isSame(c, d)) d = turnLeft(d);
        c = turnRight(c);
      }
    } else if (isSame(a, b) && !isSame(b, c)) {
      // a만 같은극,
      if (direct === 1) {
        b = turnRight(b);
        if (!isSame(c, d)) d = turnRight(d);
        c = turnLeft(c);
      } else {
        b = turnLeft(b);
        if (!isSame(c, d)) d = turnLeft(d);
        c = turnRight(c);
      }
    } else {
      // c만 같은 극
      if (direct === 1) {
        a = turnLeft(a);
        b = turnRight(b);
      } else {
        a = turnRight(a);
        b = turnLeft(b);
      }
    }
  } else if (gear === 3) {
    if (isSame(b, c) && isSame(c, d)) {
      c = direct === 1 ? turnRight(c) : turnLeft(c);
    } else if (!isSame(b, c) && isSame(c, d)) {
      if (direct === 1) {
        if (!isSame(a, b)) a = turnRight(a);
        b = turnLeft(b);
        c = turnRight(c);
      } else {
        if (!isSame(a, b)) a = turnLeft(a);
        b = turnRight(b);
        c = turnLeft(c);
      }
    } else if (isSame(b, c) && !isSame(c, d)) {
      if (direct === 1) {
        c = turnRight(c);
        d = turnLeft(d);
      } else {
        c = turnLeft(c);
        d = turnRight(d);
      }
    } else {
      if (direct === 1) {
        if (!isSame(a, b)) a = turnRight(a);
        b = turnLeft(b);
        c = turnRight(c);
        d = turnLeft(d);
      } else {
        if (!isSame(a, b)) a = turnLeft(a);
        b = turnRight(b);
        c = turnLeft(c);
        d = turnRight(d);
      }
    }
  } else {
    if (isSame(c, d)) {
      d = direct === 1 ? turnRight(d) : turnLeft(d);
    } else {
      if (direct === 1) {
        if (!isSame(b, c)) {
          if (!isSame(a, b)) a = turnLeft(a);
          b = turnRight(b);
        }
        c = turnLeft(c);
        d = turnRight(d);
      } else {
        if (!isSame(b, c)) {
          if (!isSame(a, b)) a = turnRight(a);
          b = turnLeft(b);
        }
        c = turnRight(c);
        d = turnLeft(d);
      }
    }
  }
}
console.log(sum(a, b, c, d));
// console.log(a.join(" "));
// console.log(b.join(" "));
// console.log(c.join(" "));
// console.log(d.join(" "));

function isSame(preGear, postGear) {
  if (preGear[2] === postGear[6]) return true;
  return false;
}

function turnRight(arr) {
  let x = arr.pop();
  arr.unshift(x);
  return arr;
}

function turnLeft(arr) {
  let x = arr.shift();
  arr.push(x);
  return arr;
}

function sum(a, b, c, d) {
  let sum = 0;
  if (a[0] === "1") sum += 1;
  if (b[0] === "1") sum += 2;
  if (c[0] === "1") sum += 4;
  if (d[0] === "1") sum += 8;
  return sum;
}
