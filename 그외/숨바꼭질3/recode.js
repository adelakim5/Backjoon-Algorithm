const [st, en] = require("fs")
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);

const MAX = Math.min(100000, Math.max(st * 2, en * 2));
const deque = Array(MAX * 2 + 2 + 1);
const HALF = Math.floor(deque.length / 2);
const visit = Array(MAX + 1);
let [half_b, half_f] = [HALF, HALF];

function push_back(loc, sec) {
  if (loc < 0 || loc > MAX) return;
  if (!visit[loc]) {
    visit[loc] = true;
    deque[--half_b] = [loc, sec];
  }
}

function push_front(loc, sec) {
  if (loc < 0 || loc > MAX) return;
  if (!visit[loc]) {
    visit[loc] = true;
    deque[half_f++] = [loc, sec];
    console.log(half_f);
    console.log(deque);
  }
}

function pop_front() {
  if (half_b >= half_f) return [null, null];
  return deque[--half_f];
}

push_front(st, 0);
while (true) {
  const [loc, sec] = pop_front();
  if (loc === en) {
    console.log(sec);
    break;
  }
  push_front(loc * 2, sec);
  push_back(loc - 1, sec + 1);
  push_back(loc + 1, sec + 1);
}
