var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var info = input[0].split(' ')
var m = info[0] / 1
var n = info[1] / 1
var h = info[2] / 1
var tomatoRack = []
var temp = []
var tomatoes = []
for (var i = 1; i < input.length; i++) {
    tomatoes = input[i].split(' ').map((element) => element/1)
    temp.push(tomatoes)
    if (temp.length === n) {
        tomatoRack.push(temp)
        temp = []
    }
}
class Node {
    constructor(data, next = null) {
        this.data = data
        this.next = next
    }
}

class LinkedList {
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

    shift(){
        if(!this.head){
            return 
        }
        if(!this.head.next){
            this.size--
            return this.head.data
        } else {
            this.head = this.head.next
            this.size--
            return this.head.data
        }
    }

    getSize(){
        return this.size;
    }
}
     

function findTomatoes() {
    var ripeOnes = []
    var unRipeCount = 0
    var emptyCount = 0
    for (var i = 0; i < tomatoRack.length; i++) {
        var tmts = tomatoRack[i]
        for (var j = 0; j < tmts.length; j++) {
            var tmt = tmts[j]
            for (var k = 0; k < tmt.length; k++) {
                if (tmt[k] === 1) {
                    ripeOnes.push({
                        h: i,
                        n: j,
                        m: k,
                        count: 0
                    })
                } else if(tmt[k]=== 0){
                    unRipeCount++
                } else if(tmt[k] === -1){
                    emptyCount++
                }
            }
        }
    }
    return {ripes: ripeOnes, unRipes: unRipeCount, empty:emptyCount}
}

var varietyTomatoes = findTomatoes()
var ripes = varietyTomatoes.ripes
var empties = varietyTomatoes.empty
var unRipes = varietyTomatoes.unRipes

var dn = [0, 0, 1, -1, 0, 0]
var dm = [0, 0, 0, 0, 1, -1]
var dh = [1, -1, 0, 0, 0, 0]

var nextM = 0
var nextN = 0
var nextH = 0
var countDays = 0

var full = m * n * h

if (ripes.length === full - empties) {
    console.log(0)
} else if (empties === full || ripes.length === 0 || unRipes === full || unRipes === full-empties) {
    console.log(-1)
} else {
    var q = new LinkedList()
    for(var i=0; i<ripes.length; i++){
        q.push(ripes[i])
    }
    while (q.getSize() !== 0) {
        var current = q.shift()
      
        for (var idx = 0; idx < 6; idx++) {
            nextH = dh[idx] + current.h
            nextN = dn[idx] + current.n
            nextM = dm[idx] + current.m
            if ((nextM >= 0 && nextM < m) && (nextN >= 0 && nextN < n) && (nextH >= 0 && nextH < h)) {              
                if (tomatoRack[nextH][nextN][nextM] === 1 || tomatoRack[nextH][nextN][nextM] === -1) continue
                if (tomatoRack[nextH][nextN][nextM] === 0) {
                    tomatoRack[nextH][nextN][nextM] = 1
                    unRipes--
                    countDays = current.count + 1
                    q.push({
                        h: nextH,
                        n: nextN,
                        m: nextM,
                        count: countDays
                    })
                }
            }
        }
    }
   if(unRipes === 0){
       console.log(current.count)
   } else {
       console.log(-1)
   }
}