const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");
// const input = fs.readFileSync("./stdin").toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const pre = (input) => {
  const color = [];
  input.slice(1).map((value) => color.push(value.split(" ").map((e) => +e)));
  return [+input[0], color];
};

console.log("pre", pre(input));

const log = console.log;
const curry = (f) => (a, ...bs) => (bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs));

const _reduce = curry(function (f, iter, acc) {
  if (arguments.length === 2) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const _map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

const _go = (a, ...bs) => _reduce((a, f) => f(a), bs, a);

const _pipe = (...bs) => (a) => _reduce((a, f) => f(a), bs, a);
/*
우선, N을 토대로 나눔.
2,4,8,16 ... 128까지

*/

const check = (m, sec, color) => {
  const [x, y] = sec;
  const temp = color[y * m][x * m];
  for (let j = 0; j < m; j++) {
    for (let i = 0; i < m; i++) {
      const dx = x * m + i;
      const dy = y * m + j;
      console.log(dx, dy);
      if (color[dy][dx] !== temp) {
        console.log("--------------");
        return false;
      }
    }
  }
  console.log(`paper : ${temp}`);
  console.log("--------------");
  return temp;
};

const divideAndConquer = ([N, color]) => {
  const answer = [0, 0];
  const sections = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  (function recur(N, color, answer) {
    const dividedN = N / 2;
    if (dividedN < 1) return;
    sections.map((sec) => {
      const paper = check(dividedN, sec, color);
      typeof paper === "number" ? ++answer[paper] : recur(dividedN, color, answer);
    });
  })(N, color, answer);
  return answer;
};

_go(input, pre, divideAndConquer, log);
