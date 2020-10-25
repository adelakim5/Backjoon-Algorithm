const fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
let vertexsAndEdges = input[0].split(' ').map((e) => +e)
const vertexNumber = vertexsAndEdges[0]
const edgesNumber = vertexsAndEdges[1]
if (vertexNumber === 1) {
    console.log(0)
} else {
    let cycleTable = Array(vertexNumber + 1)
    for (let i = 0; i <= vertexNumber; i++) {
        cycleTable[i] = i
    }

    class Heap {
        constructor() {
            this.nodes = []
            this.size = 0
        }

        insert(data) {
            this.nodes.push(data)
            this.bubbleUp()
        }

        bubbleUp(index = this.nodes.length - 1) {
            if (index < 1) return

            let current = this.nodes[index]
            let parentIndex = Math.floor((index - 1) / 2)
            let parent = this.nodes[parentIndex]

            if (current[2] >= parent[2]) return

            this.nodes[index] = parent
            this.nodes[parentIndex] = current
            index = parentIndex
            this.bubbleUp(index)
        }

        getSize() {
            return this.size
        }

        extract() {
            const min = this.nodes[0]
            if (this.nodes.length === 1) {
                this.nodes.pop()
                return min
            }
            this.nodes[0] = this.nodes.pop()
            this.trickleDown()
            return min
        }

        trickleDown(index = 0) {
            let leftChildIndex = index * 2 + 1
            let rightChildIndex = index * 2 + 2
            let minimum = index

            if (!this.nodes[leftChildIndex] && !this.nodes[rightChildIndex]) return

            if (!this.nodes[rightChildIndex]) {
                // only left 
                if (this.nodes[leftChildIndex][2] < this.nodes[minimum][2]) {
                    minimum = leftChildIndex
                }
            } else {
                // left and right 
                if (this.nodes[leftChildIndex][2] > this.nodes[rightChildIndex][2]) {
                    // left weight > right weight 
                    if (this.nodes[rightChildIndex][2] < this.nodes[minimum][2]) {
                        minimum = rightChildIndex
                    }
                } else {
                    if (this.nodes[leftChildIndex][2] < this.nodes[minimum][2]) {
                        minimum = leftChildIndex
                    }
                }
            }
            if (index !== minimum) {
                let t = this.nodes[index]
                this.nodes[index] = this.nodes[minimum]
                this.nodes[minimum] = t
                this.trickleDown(minimum)
            }
        }
    }

    let setTable = (start, end) => {
        let endValue = cycleTable[end]
        for (let i = 1; i < cycleTable.length; i++) {
            if (cycleTable[i] === endValue) cycleTable[i] = cycleTable[start]
        }
        console.log("set table cycleTable", cycleTable)
        return cycleTable
    }

    let isIntegrated = (cycleTable) => {
        for (let i = 2; i < cycleTable.length; i++) {
            if (cycleTable[i - 1] !== cycleTable[i]) return false
        }
        return true
    }

    let linksHeap = new Heap()
    for (let i = 1; i < input.length; i++) {
        linksHeap.insert(input[i].split(' ').map((e) => +e))
    }
    console.log("linksHeap", linksHeap)
    let count = 0
    let sum = 0
    while (count !== edgesNumber - 1) {
        let [start, end, weight] = linksHeap.extract()
        console.log("start", start, "end", end, "weight:", weight)
        // console.log("visit[start]", visit[start], "visit[end]", visit[end])
        if (cycleTable[start] === cycleTable[end]) continue
        if (cycleTable[start] !== cycleTable[end]) {
            cycleTable = setTable(start, end)
            sum += weight
            count++
        }

        if (isIntegrated(cycleTable)) break
    }

    console.log("count:", count)
    console.log("sum", sum)
}