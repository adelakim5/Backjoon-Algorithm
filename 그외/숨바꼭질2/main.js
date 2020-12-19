const fs = require("fs");
const [st, en] = fs
  .readFileSync("stdin.txt")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e);
let min = Infinity;
let ways = 0;
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListQ {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  push(data) {
    let node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.size++;
      return;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    let x = this.head;
    if (this.size === 1) {
      this.size--;
      this.head = null;
      return x.data;
    }
    this.head = x.next;
    this.size--;
    return x.data;
  }
}

function bfs() {
  let q = new LinkedListQ();
  let visit = Array(100001).fill(false);
  q.push({ loc: st, sec: 0 });
  while (q.size) {
    const { loc, sec } = q.shift();
    visit[loc] = true;
    if (loc === en) {
      if (min > sec) {
        min = sec;
        ways = 1;
      } else if (min === sec) ways++;
    }
    const a = loc - 1;
    const b = loc + 1;
    const c = loc * 2;
    if (a >= 0 && !visit[a]) {
      q.push({ loc: a, sec: sec + 1 });
    }
    if (b <= 100001 && !visit[b]) {
      q.push({ loc: b, sec: sec + 1 });
    }
    if (c <= 100001 && !visit[c]) {
      q.push({ loc: c, sec: sec + 1 });
    }
  }
  return `${min}\n${ways}`;
}

console.log(bfs());
