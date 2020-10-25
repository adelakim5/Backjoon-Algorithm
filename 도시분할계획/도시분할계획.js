var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
var temp = input[0].split(' ')
var m = parseInt(temp[1])
var n = parseInt(temp[0])

class Node {
    constructor(data, next = null, front = null) {
        this.data = data
        this.next = next
        this.front = front
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    findTarget(newOne) {
        var t = this.head
        for (var i = 0; i < this.size; i++) {
            var value = t.data
            if (value[2] > newOne) return t
            t = t.next
        }
        return null
    }

    push(data) {
        let newNode = new Node(data)
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
            this.size++
        } else {
            var newOne = newNode.data
            var target = this.findTarget(newOne[2])
            if (target !== null) {
                if (target === this.head) {
                    newNode.next = target
                    target.front = newNode
                    newNode.next = target
                    this.head = newNode
                    this.size++
                } else {
                    target.front.next = newNode
                    newNode.front = target.front
                    target.front = newNode
                    newNode.next = target
                    this.size++
                }
            } else {
                this.tail.next = newNode
                newNode.front = this.tail
                this.tail = newNode
                this.size++
            }
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
            var x = this.head
            this.head = this.head.next
            this.size--
            return x.data
        }
    }

    getSize() {
        return this.size;
    }

    print() {
        var t = this.head
        for (var i = 0; i < this.size; i++) {
            console.log(t.data)
            t = t.next
        }
    }
}

var loads = new DoublyLinkedList()
for (var k = 1; k < input.length; k++) {
    loads.push(input[k].split(' ').map((element) => element / 1))
}
loads.print()

var loads = []
for (var k = 1; k < input.length; k++) {
    loads.push(input[k].split(' ').map((element) => element / 1))
}

var cycleTable = new Array(n)
for (var i = 0; i < cycleTable.length; i++) {
    cycleTable[i] = i
}

console.log("cycleTable:", cycleTable)
var loadWeight = 0
loads.forEach((element) => {
    var first = element[0]
    var second = element[1]
    loadWeight = element[2]
    if(cycleTable[first-1] !== cycleTable[second-1]){

    }
})

var totalWeightOfLoads = 0
var edgeCount = 0


while (edgeCount !== n - 1) {
    var currentLoad = loads.shift()
    console.log("currentLoad:", currentLoad)
    var first = currentLoad[0]
    var second = currentLoad[1]
    loadWeight = currentLoad[2]
    if (cycleTable[first - 1] !== cycleTable[second - 1]) {
        cycleTable = connectHomes(first, second, cycleTable)
        totalWeightOfLoads += loadWeight
        edgeCount++
        console.log("total:", totalWeightOfLoads)
    } else {
        continue
    }
}

console.log(totalWeightOfLoads - loadWeight)

function isUnified(cycleTable) {
    for (var i = 1; i < cycleTable.length; i++) {
        if (cycleTable[i - 1] !== cycleTable[i]) return false
    }
    return true
}

function connectHomes(first, second, cycleTable) {
    for (var i = 0; i < cycleTable.length; i++) {
        if (cycleTable[i] === cycleTable[second - 1]) cycleTable[i] = cycleTable[first - 1]
    }
    return cycleTable
}
