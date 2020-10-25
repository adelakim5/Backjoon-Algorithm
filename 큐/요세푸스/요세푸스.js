const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map((e) => +e);
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split(' ').map((e) => +e);

const n = input[0]
const k = input[1]

console.log(input)

class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class Queue {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    push(data) {
        let node = new Node(data)
        if (!this.head) {
            this.head = node
            this.tail = node
            this.size++
            return
        }
        this.tail.next = node
        this.tail = node
        this.size++
    }

    pop() {
        let t = this.head
        if (this.size === 1) {
            this.head = null
            this.tail = null
            this.size--
            return t.data
        }
        this.head = t.next
        this.size--
        return t.data
    }

    getSize() {
        return this.size
    }
}

let q = new Queue()
for (let i = 1; i <= n; i++) {
    q.push(i)
}

console.log("q:", q)

let answer = "<"
let i = 1

while (true) {
    let p = q.pop()
    if (i === k) {
        if (!q.getSize()) {
            answer += p.toString() + ">"
            break;
        } else answer += p.toString() + ", "
        i = 1
    } else {
        q.push(p)
        i++
    }
}
console.log(answer)