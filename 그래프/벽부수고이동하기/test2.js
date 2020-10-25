const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
input[0] = input[0].split(" ");
const n = +input[0][0];
const m = +input[0][1];

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
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
    return;
  }

  shift() {
    let x = this.head;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
      return x.data;
    }
    this.head = x.next;
    this.size--;
    return x.data;
  }

  getSize() {
    return this.size;
  }

  getFront() {
    return this.head.data;
  }
}

// console.log(initVisit(8, 8));
let visit = initVisit(n, m);
console.log("visit", visit);
let walls = [];
for (let i = 1; i <= n; i++) {
  walls.push(input[i].split(""));
}

// const answer = bfs();
console.log(bfs());

function initVisit(n, m) {
  let visit = [];
  visit[true] = Array.from(Array(n), () => Array(m).fill(false));
  visit[false] = Array.from(Array(n), () => Array(m).fill(false));
  return visit;
}

function bfs() {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  let q = new Queue();
  let start = {};
  start.x = 0;
  start.y = 0;
  start.c = 1;
  start.key = false;
  q.push(start);
  //   console.log("start:", start, "q:", q);
  visit[false][start.y][start.x] = true;
  while (q.getSize()) {
    // console.log(q.getFront());
    const past = q.shift();
    const x = past.x;
    const y = past.y;
    const c = past.c;
    const k = past.key;
    // console.log("k ? ", k);

    if (x === m - 1 && y === n - 1) return c;
    // q.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      let nk = k;
      //   console.log("hello nk:", nk);
      if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
        if (nk) {
          // 이미 벽 부숨
          if (walls[ny][nx] === "1" || visit[nk][ny][nx]) continue;
          visit[nk][ny][nx] = true;
        } else {
          // 아직 벽 안부숨
          if (visit[nk][ny][nx]) continue;
          if (walls[ny][nx] === "1") {
            nk = true;
            visit[nk][ny][nx] = true;
          } else visit[false][ny][nx] = true;
        }
        let curr = {};
        curr.x = nx;
        curr.y = ny;
        curr.c = c + 1;
        curr.key = nk;
        if (nx === m - 1 && ny === n - 1) return curr.c;
        q.push(curr);
        // console.log("after push, q:", q);

        // console.log("visit:", visit);
      }
    }
  }
  return -1;
}
