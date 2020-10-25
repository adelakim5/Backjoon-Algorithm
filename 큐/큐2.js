const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n').map((e)=> e.split(' '));

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
        if (!this.size) {
            return -1
        }
        if (this.size === 1) {
            let x = this.head.data
            this.head = null
            this.tail = null
            this.size--
            return x
        }
        let x = this.head.data
        this.head = this.head.next
        this.size--
        return x
    }

    isEmpty() {
        if (!this.size) return 1
        return 0
    }

    front() {
        if (!this.size) {
            return -1
        }
        return this.head.data
    }

    back() {
        if (!this.size) {
            return -1
        }
        return this.tail.data
    }

    getSize() {
        return this.size
    }
}

let q = new Queue()
let result = ''

for (let i=1; i<input.length; i++) {
    let cmd = input[i][0]
    let data = +input[i][1]
    if (cmd === /push/) {
        q.push(data)
    } else if (cmd === /pop/) {
        result += q.pop() + "\n"
    } else if (cmd === /size/) {
        result += q.getSize() + "\n"
    } else if (cmd === /empty/) {
        result += q.isEmpty() + "\n"
    } else if (cmd === /front/) {
        result += q.front() + "\n"
    } else {
        result += q.back() + "\n"
    }
}

console.log(result.trim())