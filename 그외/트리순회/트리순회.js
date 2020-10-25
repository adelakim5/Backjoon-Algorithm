const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const n = +input[0];
let nodes = [];
for (let i = 1; i <= n; i++) {
  nodes.push(input[i].split(" "));
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.visit = false;
  }
}

class BT {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  insert(data) {
    const curr = data[0];
    const left = data[1];
    const right = data[2];
    if (!this.root) {
      let currNode = new Node(curr);
      this.root = currNode;
      this.size++;
      if (left === "." && right === ".") return;
      if (left !== ".") {
        let leftNode = new Node(left);
        this.root.left = leftNode;
        this.size++;
      }
      if (right !== ".") {
        let rightNode = new Node(right);
        this.root.right = rightNode;
        this.size++;
      }
      return;
    }
    if (left === "." && right === ".") return;
    let res = [];
    this.findTarget(this.root, curr, res);
    let target = res[0];
    // console.log("In Insert... finished finding the target:", target);
    if (left !== ".") {
      let leftNode = new Node(left);
      target.left = leftNode;
      this.size++;
    }
    if (right !== ".") {
      let rightNode = new Node(right);
      target.right = rightNode;
      this.size++;
    }
    // console.log("finished inserting children into the target:", target);
  }

  preOrder(node, res) {
    // console.log("Res:", res);
    if (node) {
      res.push(node.data);
      res = this.preOrder(node.left, res);
      res = this.preOrder(node.right, res);
    }
    return res;
  }

  inOrder(node, res) {
    if (node) {
      res = this.inOrder(node.left, res);
      res.push(node.data);
      res = this.inOrder(node.right, res);
    }
    return res;
  }

  postOrder(node, res) {
    if (node) {
      res = this.postOrder(node.left, res);
      res = this.postOrder(node.right, res);
      res.push(node.data);
    }
    return res;
  }

  findTarget(node, curr, res) {
    // console.log("now find the target!!!", curr, "current node:", node);
    if (node && node.data === curr) {
      res.push(node);
      return node;
    }
    if (node) {
      node.left = this.findTarget(node.left, curr, res);
      //   console.log("res:::", res);
      //   if (res.length) return res[0];
      node.right = this.findTarget(node.right, curr, res);
      //   if (res.length) return res[0];
    }
    return node;
  }
}

let bt = new BT();

for (let node of nodes) {
  bt.insert(node);
}
if (bt.size === 1) {
  console.log(bt.root.data);
  return;
}
const answer = bt.preOrder(bt.root, []).join("") + "\n" + bt.inOrder(bt.root, []).join("") + "\n" + bt.postOrder(bt.root, []).join("");
console.log(answer);
