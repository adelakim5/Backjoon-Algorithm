const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

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

  insert(data) {
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

  remove() {
    let x = this.head;
    if (this.size === 1) {
      this.head = null;
      this.size--;
      return x.data;
    }
    this.head = this.head.next;
    this.size--;
    return x.data;
  }

  getSize() {
    return this.size;
  }
}

const [m, n] = input[0].split(" ").map((e) => +e);
let tomatoes = [];
let unripedTomatoesCnt = 0;
let ripedTomatoes = [];
let emptyCnt = 0;

for (let i = 1; i <= n; i++) {
  const tomatoRow = input[i].split(" ");
  for (let j = 0; j < m; j++) {
    if (tomatoRow[j] === "0") unripedTomatoesCnt++;
    if (tomatoRow[j] === "1") ripedTomatoes.push([i - 1, j]);
    if (tomatoRow[j] === "-1") emptyCnt++;
  }
  tomatoes.push(tomatoRow);
}

let ripedTomatoesCnt = ripedTomatoes.length;

// main
if (!unripedTomatoesCnt) {
  // 모든 토마토가 다 익어있는 상태라면
  console.log(0);
} else {
  // 그렇지 않다면
  if (!ripedTomatoesCnt) {
    //   만약 모든 토마토가 다 안익은 상태라면?
    console.log(-1);
    return;
  }
  let visit = Array.from(Array(n), () => Array(m).fill(false));
  let q = new Queue();
  for (let ripedTomato of ripedTomatoes) {
    const x = ripedTomato[0];
    const y = ripedTomato[1];
    q.insert({
      x: x,
      y: y,
      day: 0,
    });
    visit[x][y] = true;
  }

  function bfs() {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    let lastDay = 0;
    while (q.getSize()) {
      const past = q.remove();
      for (let i = 0; i < 4; i++) {
        const nx = past.x + dx[i];
        const ny = past.y + dy[i];
        const nDay = past.day + 1;
        if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
          if (!visit[nx][ny] && tomatoes[nx][ny] === "0") {
            visit[nx][ny] = true;
            lastDay = nDay;
            tomatoes[nx][ny] = "1";
            q.insert({
              x: nx,
              y: ny,
              day: nDay,
            });
            unripedTomatoesCnt--;
          }
        }
      }
    }
    return lastDay;
  }
  const answer = bfs();

  unripedTomatoesCnt === 0 ? console.log(answer) : console.log(-1);
}
