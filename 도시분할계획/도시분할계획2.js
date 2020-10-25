var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var temp = input[0].split(' ')
var n = parseInt(temp[0])
var m = parseInt(temp[1])

var links = []
for (var i = 1; i < input.length; i++) {
    links.push(input[i].split(' ').map((element) => element / 1))
}

class Node {
    constructor(current, next = null) {
        this.current = current
        this.connected = []
        this.next = next
    }
}

class Graph {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    getNextHome(nextHome) {
        var t = this.head
        for (var i = 0; i < this.size; i++) {
            if (t.current === nextHome) return [t.current, t.connected]
            t = t.next
        }
        return null
    }

    findTarget(vertex) {
        var t = this.head
        for (var i = 0; i < this.size; i++) {
            if (t.current === vertex) return t
            t = t.next
        }
        return null
    }

    insert(data) {
        var curr = data[0]
        var conn = data[1]
        var weight = data[2]
        if (!this.head) {
            var newNode = new Node(curr)
            this.head = newNode
            this.tail = newNode
            newNode.connected.push([conn, weight])
            this.size++
        } else {
            var target = this.findTarget(curr)
            if (target === null) {
                var newNode = new Node(curr)
                newNode.connected.push([conn, weight])
                this.tail.next = newNode
                this.tail = newNode
                this.size++
            } else {
                target.connected.push([conn, weight])
            }
        }
    }

    shift() {
        if (!this.head) {
            return
        }
        if (!this.head.next) {
            this.size--
            return [this.head.current, this.head.connected]
        } else {
            var x = this.head
            this.head = this.head.next
            this.size--
            return [x.current, x.connected]
        }
    }

    getSize() {
        return this.size
    }

    print() {
        var t = this.head
        for (var i = 0; i < this.size; i++) {
            console.log("current:", t.current, "connected:", t.connected)
            t = t.next
        }
    }
}

var linksList = new Graph()

for (var i = 0; i < links.length; i++) {
    linksList.insert(links[i])
}
var visit = Array(n).fill(false)

var edgeCount = 0
var totalLoadsWeight = 0
var startHomeInfo = linksList.shift()
var maxLoad = 0
while (linksList.getSize() !== 0) {
    console.log("------------------------------------")
    var flag = false
    var home = startHomeInfo[0]
    console.log("home:", home)
    if (!visit[home - 1]) {
        visit[home - 1] = true
        console.log("visit:", visit)

        var candidates = startHomeInfo[1]
        console.log("candidates:", candidates)

        candidates = candidates.sort((a, b) => a[1] - b[1])
        console.log("after sort:", candidates)

        for (var i = 0; i < candidates.length; i++) {
            var nextHome = candidates[i][0]
            var nextWeight = candidates[i][1]
            if (!visit[nextHome - 1]) {
                startHomeInfo = linksList.getNextHome(nextHome)
                totalLoadsWeight += nextWeight
                console.log("total:", totalLoadsWeight, "nextweight:", nextWeight)
                if (nextWeight > maxLoad) {
                    maxLoad = nextWeight
                }
                edgeCount++
                flag = true
                break
            }

        }

        if (!flag) {
            startHomeInfo = linksList.shift()
        }
    } else {
        startHomeInfo = linksList.shift()
    }

    // console.log("startHomeInfo:", startHomeInfo)
}
console.log("total:", totalLoadsWeight)