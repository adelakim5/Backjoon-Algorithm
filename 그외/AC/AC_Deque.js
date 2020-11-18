const fs = require("fs");
const { threadId } = require("worker_threads");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

class Node {
  constructor(data) {
    this.data = data;
    this.front = null;
    this.next = null;
  }
}

class Deque {
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
    node.front = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  pop() {
    let x = this.tail;
    if (this.size === 1) {
      this.tail = null;
      this.head = null;
      this.size--;
      return x.data;
    }
    this.tail.front.next = null;
    this.tail = x.front;
    x.front = null;
    this.size--;
    return x.data;
  }
  unshift(data) {
    let node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.size++;
      return;
    }
    this.head.front = node;
    node.next = this.head;
    this.head = node;
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
    this.head.front = null;
    x.next = null;
    this.size--;
    return x.data;
  }
  getReverse() {
    let res = [];
    let t = this.tail;
    for (let i = this.size - 1; i >= 0; i--) {
      res.push(t.data);
      t = t.front;
    }
    return res;
  }
  getRight() {
    let res = [];
    let t = this.head;
    for (let i = 0; i < this.size; i++) {
      res.push(t.data);
      t = t.next;
    }
    return res;
  }
}

const testCase = +input[0];
const E = "error";
let cnt = 0;
let idx = 1;
let answer = "";

while (cnt < testCase) {
  const func = input[idx];
  const n = +input[idx + 1];
  const deleteCnt = getCount(func);
  //   console.log(`arr: ${arr}`);
  if (deleteCnt > n) {
    answer += E + "\n";
  } else if (deleteCnt < n) {
    let dq = new Deque();
    let arr = input[idx + 2].split(/[\[\],]/);
    arr = arr.slice(1, arr.length - 1);
    console.log(`arr`);
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      dq.push(arr[i]);
    }
    answer += work(func, dq) + "\n";
    // let arr = setArr(input[idx + 2]);
    // answer += work(func, arr) + "\n";
  } else {
    answer += "[]\n";
  }
  idx += 3;
  cnt++;
}
console.log(answer.trim());

function getCount(func) {
  let cnt = 0;
  for (let command of func) {
    if (command === "D") cnt++;
  }
  return cnt;
}

function work(func, dq) {
  let r = 1;
  for (let command of func) {
    if (command === "R") {
      switch (r) {
        case 1:
          r = -1;
          break;
        case -1:
          r = 1;
          break;
      }
    } else {
      switch (r) {
        case 1:
          dq.shift();
          break;
        case -1:
          dq.pop();
          break;
      }
    }
  }
  let res = r === 1 ? dq.getRight() : dq.getReverse();
  //   console.log(res);
  return `[${res.join(",")}]`;
}
