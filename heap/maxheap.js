let fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
let n = +input[0]
let operations = []
for (let i = 1; i < input.length; i++) {
    operations.push(+input[i])
}

class maxHeap {
    constructor() {
        this.nodes = []
    }

    insert(data) {
        this.nodes.push(data)
        this.bubbleUp()
    }

    bubbleUp(index = this.nodes.length - 1) {
        if (index < 1) return
        let currentNode = this.nodes[index]
        let parentIndex = Math.floor((index - 1) / 2)
        let parentNode = this.nodes[parentIndex]

        if (parentNode >= currentNode) return

        this.nodes[parentIndex] = currentNode
        this.nodes[index] = parentNode
        index = parentIndex
        this.bubbleUp(index)
    }

    extract() {
        const max = this.nodes[0]
        if (this.nodes.length === 1) {
            this.nodes.pop()
            return max
        }
        this.nodes[0] = this.nodes.pop()
        this.trickleDown()
        return max
    }

    trickleDown(index = 0) {
        let leftChildIndex = index * 2 + 1
        let rightChildIndex = index * 2 + 2
        let length = this.nodes.length
        let maximum = index
        console.log("index === maximum", maximum)
        console.log("this.nodes", this.nodes)

        if (!this.nodes[leftChildIndex] && !this.nodes[rightChildIndex]) return

        if (!this.nodes[rightChildIndex]) {
            if (this.nodes[leftChildIndex] > this.nodes[maximum]) {
                maximum = leftChildIndex
                console.log("after maximum", maximum)
            }
        }

        if (this.nodes[leftChildIndex] < this.nodes[rightChildIndex]) {
            if (rightChildIndex <= length && this.nodes[rightChildIndex] > this.nodes[maximum]) {
                maximum = rightChildIndex
                console.log("after maximum", maximum)
            }
        } else {
            if (leftChildIndex <= length && this.nodes[leftChildIndex] > this.nodes[maximum]) {
                maximum = leftChildIndex
                console.log("after maximum", maximum)
            }
        }

        console.log("total after maximum", maximum)
        console.log("current nodes", this.nodes)

        if (maximum !== index) {
            let t = this.nodes[maximum]
            this.nodes[maximum] = this.nodes[index]
            this.nodes[index] = t
            console.log("after exchanged nodes:", this.nodes)
            this.trickleDown(maximum)
        }
    }
}
const heap = new maxHeap()
let extracts = ''
console.log("operations", operations)
operations.forEach((operation, index) => {
    if (operation !== 0) {
        heap.insert(operation)
        console.log("operation",operation,"heap status:", heap.nodes)
    } else {
        if (heap.nodes.length === 0) {
            console.log("operation",operation,"heap status:", heap.nodes)
            extracts += "0" + "\n"
        } else {
            let t = heap.extract()
            console.log("operation",operation,"heap status:", heap.nodes)
            extracts += t + "\n"
        }
    }
})

console.log(extracts.trim())