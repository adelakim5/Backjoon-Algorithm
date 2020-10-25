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
}

main();

function main() {
  let walls = [];
  for (let i = 1; i <= n; i++) {
    walls.push(input[i].split(""));
  }

  const visited = initVisit();

  const start = {
    coord: [0, 0],
    cnt: 1,
    desCount: 0,
    visit: visited,
  };
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const results = bfs(start, [], dx, dy, start, walls);
  if (!results.length) {
    console.log(-1);
    return;
  }
  console.log(results[0]);
}

function initVisit() {
  let visited = [];
  for (let i = 0; i < n; i++) {
    visited.push(Array(m).fill(false));
  }
  visited[0][0] = true;
  return visited;
}

function isLast(nextX, nextY, m, n) {
  if (nextY === n - 1 && nextX === m - 1) return true;
  return false;
}

function bfs(start, results, dx, dy, start, walls) {
  let q = new Queue();
  q.push(start);
  // console.log("q:", q);
  let flag = false;
  while (q.getSize()) {
    const curr = q.shift();
    // console.log("curr: ", curr);
    const y = curr.coord[0];
    const x = curr.coord[1];
    for (let i = 0; i < 4; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];
      if (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n) {
        let nextCurrVisit = curr.visit.slice().map((e) => e.slice());
        if (nextCurrVisit[nextY][nextX]) continue;
        // 해당 좌표에 방문한 적 없음
        if (curr.desCount > 1) continue;
        let nextCurr = {
          coord: [nextY, nextX],
          cnt: curr.cnt + 1,
          desCount: curr.desCount,
        };
        if (walls[nextY][nextX] === "0") {
          // 벽이 없음
          if (isLast(nextX, nextY, m, n)) {
            if (results.length) results.pop();
            results.push(nextCurr.cnt);
            flag = true;
            break;
          }
          nextCurrVisit[nextY][nextX] = true;
          nextCurr.visit = nextCurrVisit;
          q.push(nextCurr);
        } else if (walls[nextY][nextX] === "1") {
          // 벽이 있음
          if (curr.desCount) continue;
          // 이미 한번 부순적이 있으면? 지나가기
          if (isLast(nextX, nextY, m, n)) {
            if (results.length) results.pop();
            results.push(nextCurr.cnt);
            flag = true;
            break;
          }
          nextCurr.desCount++;
          nextCurrVisit[nextY][nextX] = true;
          nextCurr.visit = nextCurrVisit;
          q.push(nextCurr);
        }
      }
    }
    if (flag) break;
  }
  return results;
}
