const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n')
const n = input.splice(0, 1)
const arr = input.map(e => +e)

class Smaller {
    constructor() {
        this.smaller = []
    }

    getMax() {
        return this.smaller[0]
    }

    getLength() {
        return this.smaller.length
    }

    insert(data) {
        this.smaller.push(data)
        this.sort()
    }

    sort(index = this.smaller.length - 1) {
        if (index < 1) return
        const currentNode = this.smaller[index]
        const parentIndex = Math.floor((index - 1) / 2)
        const parentNode = this.smaller[parentIndex]

        if (parentNode >= currentNode) return

        this.smaller[parentIndex] = currentNode
        this.smaller[index] = parentNode
        index = parentIndex
        this.sort(index)
    }

    extract() {
        const max = this.smaller[0]
        if (this.smaller.length === 1) {
            this.smaller.pop()
            return max
        }
        this.smaller[0] = this.smaller.pop()
        this.trickleDown()
        return max
    }

    trickleDown(index = 0) {
        const leftChildIndex = index * 2 + 1
        const rightChildIndex = index * 2 + 2
        const len = this.smaller.length
        let maximum = index

        if (!this.smaller[leftChildIndex] && !this.smaller[rightChildIndex]) return

        if (!this.smaller[rightChildIndex]) {
            if (this.smaller[leftChildIndex] > this.smaller[maximum]) {
                maximum = leftChildIndex
            }
        }

        if (this.smaller[leftChildIndex] < this.smaller[rightChildIndex]) {
            if (rightChildIndex <= len && this.smaller[rightChildIndex] > this.smaller[maximum]) {
                maximum = rightChildIndex
            }
        } else {
            if (leftChildIndex <= len && this.smaller[leftChildIndex] > this.smaller[maximum]) {
                maximum = leftChildIndex
            }
        }

        if (maximum !== index) {
            const t = this.smaller[maximum]
            this.smaller[maximum] = this.smaller[index]
            this.smaller[index] = t
            this.trickleDown(maximum)
        }
    }
}

class Bigger {
    constructor() {
        this.bigger = []
    }

    getMin() {
        return this.bigger[0]
    }

    getLength() {
        return this.bigger.length
    }

    insert(data) {
        this.bigger.push(data)
        this.sort()
    }

    sort(index = this.bigger.length - 1) {
        if (index < 1) return
        const currentNode = this.bigger[index]
        const parentIndex = Math.floor((index - 1) / 2)
        const parentNode = this.bigger[parentIndex]

        if (parentNode <= currentNode) return

        this.bigger[index] = parentNode
        this.bigger[parentIndex] = currentNode
        index = parentIndex
        this.sort(index)
    }

    extract() {
        const min = this.bigger[0]
        if (this.bigger.length === 1) {
            this.bigger.pop()
            return min
        }
        this.bigger[0] = this.bigger.pop()
        this.trickleDown()
        return min
    }

    trickleDown(index = 0) {
        const leftChildIndex = index * 2 + 1
        const rightChildIndex = index * 2 + 2
        const length = this.bigger.length
        let minimum = index
        if (!this.bigger[leftChildIndex] && !this.bigger[rightChildIndex]) return;
        if (!this.bigger[rightChildIndex]) {
            if (this.bigger[leftChildIndex] < this.bigger[minimum]) {
                minimum = leftChildIndex
            }
        }
        if (this.bigger[leftChildIndex] > this.bigger[rightChildIndex]) {
            if (rightChildIndex <= length && this.bigger[rightChildIndex] < this.bigger[minimum]) {
                minimum = rightChildIndex
            }
        } else {
            if (leftChildIndex <= length && this.bigger[leftChildIndex] < this.bigger[minimum]) {
                minimum = leftChildIndex
            }
        }
        if (minimum !== index) {
            let t = this.bigger[minimum]
            this.bigger[minimum] = this.bigger[index]
            this.bigger[index] = t
            this.trickleDown(minimum)
        }
    }
}

class MidNumber {
    constructor() {
        this.smaller = new Smaller()
        this.bigger = new Bigger()
    }

    insert(number) {
        if (this.smaller.getLength() === 0) {
            this.smaller.insert(number)
            return
        }
        this.smaller.getLength() > this.bigger.getLength() ? this.bigger.insert(number) : this.smaller.insert(number)
        this.checkState()
    }

    checkState() {
        const max = this.smaller.getMax()
        const min = this.bigger.getMin()
        if (max <= min) return
        else {
            this.smaller.extract()
            this.bigger.extract()
            this.smaller.insert(min)
            this.bigger.insert(max)
        }
    }

    getMid() {
        return this.smaller.getMax()
    }
}

let midNumber = new MidNumber()
let answer = ''
for (let i = 0; i < n; i++) {
    midNumber.insert(arr[i])
    answer += midNumber.getMid() + "\n"
}

console.log(answer.trim())