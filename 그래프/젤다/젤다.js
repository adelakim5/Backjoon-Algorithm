const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

class MinHeap {
    constructor() {
        this.nodes = []
    }

    getSize() {
        return this.nodes.length
    }

    insert(data) {
        this.nodes.push(data)
        this.bubbleUp()
    }

    bubbleUp(index = this.nodes.length - 1) {
        if (index < 1) return
        const currentNode = this.nodes[index]
        const parentIndex = Math.floor((index - 1) / 2)
        const parentNode = this.nodes[parentIndex]

        if (parentNode.val <= currentNode.val) return

        this.nodes[index] = parentNode
        this.nodes[parentIndex] = currentNode
        index = parentIndex
        this.bubbleUp(index)
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
        const leftChildIndex = index * 2 + 1
        const rightChildIndex = index * 2 + 2
        const length = this.nodes.length
        let minimum = index
        // 자식 둘 다 없으면 끝 
        if (!this.nodes[leftChildIndex] && !this.nodes[rightChildIndex]) return

        // 왼쪽 자식만 있는경우
        if (!this.nodes[rightChildIndex]) {
            if (this.nodes[leftChildIndex].val < this.nodes[minimum].val) {
                minimum = leftChildIndex
            }
        }

        // 양쪽 자식이 있는 경우
        // 왼쪽 자식이 오른쪽 자식보다 더 큰 경우
        else if (this.nodes[leftChildIndex].val > this.nodes[rightChildIndex].val) {
            if (rightChildIndex <= length && this.nodes[rightChildIndex].val < this.nodes[minimum].val) {
                // 더 작은 오른쪽 자식보다 큰 경우
                minimum = rightChildIndex
                // 오른쪽 자식으로 인덱스 바꿈 
            }
        } else {
            // 오른쪽 자식이 더 큰경우
            if (leftChildIndex <= length && this.nodes[leftChildIndex].val < this.nodes[minimum].val) {
                // 더 작은 왼쪽 자식보다 큰 경우
                minimum = leftChildIndex
                // 왼쪽 자식으로 인덱스 바꿈
            }
        }
        if (minimum !== index) {
            let t = this.nodes[minimum]
            this.nodes[minimum] = this.nodes[index]
            this.nodes[index] = t
            // 부모와 자식 위치를 서로 바꿈
            this.trickleDown(minimum)
            // trickleDown 재개 
        }
    }

}


let caves = []
let ns = []
for (let i = 0; i < input.length;) {
    let n = input[i] / 1
    if (!n) break
    ns.push(n)
    let cave = []
    for (let j = i + 1; j <= i + n; j++) {
        cave.push(...input[j].split(' ').map(e => +e))
    }
    caves.push(cave)
    i += n + 1
}

let answer = ''

for (let i = 0; i < caves.length; i++) {
    let heap = new MinHeap()
    let dTable = Array(caves[i].length).fill(Infinity)
    const lastIndex = caves[i].length - 1
    let n = ns[i]
    dTable[0] = caves[i][0]
    heap.insert({
        val: dTable[0],
        idx: 0
    })

    while (heap.getSize()) {
        let min = heap.extract()
        // console.log("min.idx:", min.idx, "min.val:", min.val)
        // console.log("heap:", heap)
        if (min.val !== dTable[min.idx]) continue
        const rightIndex = min.idx + 1
        const underIndex = min.idx + n
        const upIndex = min.idx - n
        const leftIndex = min.idx - 1
        if (rightIndex <= lastIndex) {
            const rightIndexValue = caves[i][rightIndex] + min.val
            // console.log(rightIndex, "rightIndexValue:", rightIndexValue)
            if (dTable[rightIndex] > rightIndexValue) {
                dTable[rightIndex] = rightIndexValue
                // console.log("dTable:", dTable)
                heap.insert({
                    val: dTable[rightIndex],
                    idx: rightIndex
                })
            }

        }
        if (underIndex <= lastIndex) {
            const underIndexValue = caves[i][underIndex] + min.val
            // console.log(underIndex, "underIndexValue:", underIndexValue)
            if (dTable[underIndex] > underIndexValue) {
                dTable[underIndex] = underIndexValue
                // console.log("dTable:", dTable)
                heap.insert({
                    val: dTable[underIndex],
                    idx: underIndex
                })
            }
        }

        if (upIndex >= 0) {
            const upIndexValue = caves[i][upIndex] + min.val
            // console.log(upIndex, "upIndexValue:", upIndexValue)
            if (dTable[upIndex] > upIndexValue) {
                dTable[upIndex] = upIndexValue
                heap.insert({
                    val: dTable[upIndex],
                    idx: upIndex
                })
            }

        }

        if (min.idx % n !== 0 && leftIndex >= 0) {
            const leftIndexValue = caves[i][leftIndex] + min.val
            // console.log(leftIndex, "leftIndexValue:", leftIndexValue)
            if (dTable[leftIndex] > leftIndexValue) {
                dTable[leftIndex] = leftIndexValue
                heap.insert({
                    val: dTable[leftIndex],
                    idx: leftIndex
                })
            }
        }

    }
    // console.log(dTable[lastIndex])
    // dTables.push(dTable[lastIndex])
    answer += "Problem " + (i+1) + ": " + dTable[lastIndex] + "\n"
}

console.log(answer.trim())
// console.log(dTable)