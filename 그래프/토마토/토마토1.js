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
    insert(data) {
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
    shift() {
        if (this.size === 0) return
        if (this.size === 1) {
            let x = this.head
            this.head = null
            this.tail = null
            this.size--
            return x.data
        }
        let x = this.head
        this.head = this.head.next
        this.size--
        return x.data
    }
    getSize() {
        return this.size
    }
}

// const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const input = require('fs').readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
let mn = input[0].split(' ')
const m = mn[0] / 1
const n = mn[1] / 1
const full = m * n
let empty = 0

let tomatoesBox = []
for (let i = 1; i < input.length; i++) {
    tomatoesBox.push(input[i].split(' '))
}

let visit = []
let dayCount = []
for (let i = 0; i < n; i++) {
    visit.push(Array(m).fill(false))
    dayCount.push(Array(m).fill(0))
}

let ripeTomatoes = []
let unripeTomatoes = 0
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (tomatoesBox[i][j] === '0') unripeTomatoes++
        if (tomatoesBox[i][j] === '1') ripeTomatoes.push([i, j])
        if (tomatoesBox[i][j] === '-1') {
            visit[i][j] = true
            empty++
        }
    }
}
console.log("unripeTomato:", unripeTomatoes)
// console.log("ripeTomatoes:", ripeTomatoes)
// console.log("visit:", visit)

if (ripeTomatoes.length === full - empty) {
    console.log(0)
    return
}

if (empty === full || ripeTomatoes.length === 0 || unripeTomatoes === full - empty) {
    console.log(-1)
    return
}

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]


let q = new Queue()
for (let tomato of ripeTomatoes) {
    q.insert(tomato)
    visit[tomato[0]][tomato[1]] = true
}

let finalDayCount = 0
console.log("q.getSize:", q.getSize())
while (q.getSize()) {
    const [i, j] = q.shift()
    // console.log("after shift q:", q)
    for (let t = 0; t < 4; t++) {
        nextI = i + dy[t]
        nextJ = j + dx[t]
        if (nextI >= 0 && nextI < n && nextJ >= 0 && nextJ < m) {
            if (visit[nextI][nextJ]) continue
            if (tomatoesBox[nextI][nextJ] === '-1' || tomatoesBox[nextI][nextJ] === '1') continue
            tomatoesBox[nextI][nextJ] = '1'
            unripeTomatoes--
            visit[nextI][nextJ] = true
            dayCount[nextI][nextJ] = dayCount[i][j] + 1
            console.log("dayCount:", dayCount)
            if (dayCount[nextI][nextJ] > finalDayCount) finalDayCount = dayCount[nextI][nextJ]
            q.insert([nextI, nextJ])
            // console.log("q:", q)
        }
    }
}

if (unripeTomatoes === 0) {
    console.log(finalDayCount)
} else {
    console.log(-1)
}

a = 0
console.log(!a)