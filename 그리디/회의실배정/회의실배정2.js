const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }
    insert(data) {
        let node = new Node(data)
        if (!this.head) {
            this.head = node
            this.tail = node
            this.size++
        } else {
            this.tail.next = node
            this.tail = node
            this.size++
        }
    }
    getSize() {
        return this.size
    }
}

const n = input[0] / 1
let meetings = []
for (let i = 1; i < input.length; i++) {
    meetings.push(input[i].split(' ').map(e => +e))
}

meetings.sort((a, b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0]
    } else return a[1] - b[1]
})

let max = 0

let list = new LinkedList()
list.insert(meetings[0])
for (let i = 1; i < meetings.length; i++) {
    if(meetings[i][0] >= list.tail.data[1]){
        list.insert(meetings[i])
    } else continue
}

console.log(list.getSize())