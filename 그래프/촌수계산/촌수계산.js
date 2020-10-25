var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = parseInt(input[0])
var questionNumbers = input[1].split(' ').map(element => element / 1)
var numberOfRelationships = parseInt(input[2])
var relationships = []
for (var i = 3; i < input.length; i++){
    relationships.push(input[i].split(' ').map((element) => element / 1))
}
console.log("relationships:", relationships)


function makeVisitArray() {
    var visit = []
    for (var i = 0; i <= n; i++) {
        visit.push(Array(n + 1))
    }
    for (var i = 0; i < relationships.length; i++) {
        var current = relationships[i]
        var p = current[0]
        var c = current[1]
        visit[p][c] = false
        visit[c][p] = false
    }
    return visit
}
/*
function makeCountArray() {
    var count = []
    for (var i = 0; i <= n; i++) {
        count.push(Array(n + 1).fill(-1))
    }
    for (var i = 0; i < relationships.length; i++) {
        var current = relationships[i]
        var p = current[0]
        var c = current[1]
        count[p][c] = 0
        count[c][p] = 0
    }
    return count
}
*/
/*
function findLinkedNumber(start, destination, count, result) {
    console.log("start:", start)
    console.log("destination:", destination)
    console.log("result:", result)
    var flag = false
    if (graph[start][destination] === 1) {
        result.push(destination)
        flag = true
        return result
    } else {
        for (var i = 0; i <= n; i++) {
            if (graph[start][i] === 1 && result.every(e => e !== i && e !== destination)) {
                flag = true
                var newStart = i
                result.push(i)
                findLinkedNumber(newStart, destination, count, result)
            }
        }
    }
    if (!flag) {
        result.pop()
    }
}
*/
var visit = makeVisitArray()
function bfs(){
    var q = []
    var start = questionNumbers[0]
    var destination = questionNumbers[1]
    var count = 0
    q.push({p: start, c: count})
    while(true){
        var flag = false
        var current = q.shift()
        console.log("current:", current)
        
        if(current.p === destination) {
            count = current.c
            break
        }

        for(let i=0; i<relationships.length; i++){
            if(relationships[i].some(e=> e === current.p) && visit[relationships[i][0]][relationships[i][1]] === false){
                visit[relationships[i][0]][relationships[i][1]] = true 
                var next = relationships[i]
                flag = true
                if(next[0] === current.p){
                    count = current.c+1
                    q.push({p:next[1], c:count})
                } else {
                    count = current.c+1
                    q.push({p:next[0], c:count})
                }
            } 
        }
        if(!flag){
            count = -1
        }
    }
    return count 
}

console.log(bfs())

// var graph = makeGraph()
// console.log(graph)
// var start = questionNumbers[0]
// var destination = questionNumbers[1]
// var result = [start]
// findLinkedNumber(start, destination, 0, result)
// if (result[result.length - 1] === -1) console.log(-1)
// else console.log(result.length - 1)