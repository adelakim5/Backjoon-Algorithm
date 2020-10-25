const fs = require("fs");
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs
  .readFileSync(__dirname + "/stdin.txt")
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");
const nodes = input.map((e) => +e);
// console.log(nodes);

if (nodes.length === 1) {
  console.log(nodes[0]);
  return;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.count = 0;
  }
  insert(data) {
    let node = new Node(data);
    if (!this.count) {
      this.root = node;
      this.count++;
      return;
    }
    let t = this.root;
    for (let i = 0; i < this.count; i++) {
      if (data > t.data) {
        // go to right
        // 1. if have a right child
        if (!t.left && t.right) {
          t = t.right;
          // 2. if have a left child
        } else if (t.left && !t.right) {
          t.right = node;
          this.count++;
          break;
          // 3. if have both children
        } else if (t.left && t.right) {
          t = t.right;
          // 4. if have no children
        } else {
          t.right = node;
          this.count++;
          break;
        }
      } else {
        // go to left
        // 1. if have a right child
        if (!t.left && t.right) {
          t.left = node;
          this.count++;
          break;
          // 2. if have a left child
        } else if (t.left && !t.right) {
          t = t.left;
          // 3. if have both children
        } else if (t.left && t.right) {
          t = t.left;
          // 4. if have no children
        } else {
          t.left = node;
          this.count++;
          break;
        }
      }
    }
  }
  postOrder(node) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    }
  }
  getRoot() {
    return this.root;
  }
}

let bst = new BST();

for (let number of nodes) {
  bst.insert(number);
}

bst.postOrder(bst.getRoot());

// console.log("is this right bst???", bst);
