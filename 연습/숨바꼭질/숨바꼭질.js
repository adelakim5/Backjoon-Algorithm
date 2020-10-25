var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split(' ');
var n = input[0] / 1
var k = input[1] / 1
class Node {
    constructor(data, next = null) {
        this.data = data
        this.next = next
    }
}

class LinkedListQ {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    push(data) {
        let newNode = new Node(data)
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
            this.size++
        } else {
            let node = new Node(data)
            this.tail.next = node
            this.tail = node
            this.size++
        }
    }

    shift() {
        if (!this.head) {
            return
        }
        if (!this.head.next) {
            this.size--
            return this.head.data
        } else {
            this.head = this.head.next
            this.size--
            return this.head.data
        }
    }

    getSize() {
        return this.size;
    }
}


function findMinWay() {
    var visit = Array(100001).fill(false)
    var q = new LinkedListQ()
    var count = 0
    q.push([n, count])
    // console.log("q", q)
    visit[n] = true
    while (q.getSize() !== 0) {
        var current = q.shift()
        // console.log("visit:", visit)
        // console.log("current:", current)
        if (current[0] === k) break
        var a = current[0] - 1
        var b = current[0] + 1
        var c = current[0] * 2
        var countAdd = current[1] + 1
        if (a !== 0 && a > 0 && !visit[a]) {
            visit[a] = true
            q.push([a, countAdd])
        }
        if (b !== 0 && b < 100001 && !visit[b]) {
            visit[b] = true
            q.push([b, countAdd])
        }
        if (c !== 0 && c < 100001 && !visit[c]) {
            visit[c] = true
            q.push([c, countAdd])
        }
    }
    return current[1]
}


if (n < k) {
    console.log(findMinWay())
} else if (n > k) {
    console.log(n - k)
} else {
    console.log(0)
}