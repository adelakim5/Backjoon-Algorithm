const fs = require("fs");
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const [n, w, l] = input[0].split(" ").map((e) => +e);
const trucks = input[1].split(" ").map((e) => (e = { w: +e, count: 0 }));

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

  addAllTrucksCount() {
    let node = this.head;
    for (let i = 0; i < this.size; i++) {
      node.data.count++;
      node = node.next;
    }
  }

  getSum() {
    if (!this.size) return 0;
    let sum = 0;
    let node = this.head;
    for (let i = 0; i < this.size; i++) {
      sum += node.data.w;
      node = node.next;
    }
    return sum;
  }
}

let q = new Queue();
let totalCount = 0;

while (trucks.length) {
  const truck = trucks[0];
  if (q.getSum() + truck.w <= l) {
    q.push(truck);
    trucks.shift();
  }
  totalCount++;
  q.addAllTrucksCount();
  if (q.head.data.count === w) {
    q.shift();
  }
}

if (q.size > 0) {
  while (q.size) {
    q.addAllTrucksCount();
    if (q.head.data.count === w) {
      q.shift();
    }
    totalCount++;
  }
}

console.log(totalCount + 1);
