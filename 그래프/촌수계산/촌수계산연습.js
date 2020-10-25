var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = parseInt(input[0])
var questionNumbers = input[1].split(' ').map(element => element / 1)
var numberOfRelationships = parseInt(input[2])
var relationships = []
for (var i = 3; i < input.length; i++){
    relationships.push(input[i].split(' ').map((element) => element / 1))
}

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

var visit = makeVisitArray()

function bfs(){
    var q = []
    var start = questionNumbers[0]
    var destination = questionNumbers[1]
    var count = 0
    q.push({p: start, c: count})
    var flag = false
    while(q.length !== 0){
        var current = q.shift()
        if(current.p === destination) {
            flag = true
            count = current.c
            break
        }

        for(let i=0; i<relationships.length; i++){
            if(relationships[i].some(e=> e === current.p) && visit[relationships[i][0]][relationships[i][1]] === false){
                visit[relationships[i][0]][relationships[i][1]] = true 
                visit[relationships[i][1]][relationships[i][0]] = true
                var next = relationships[i]
                if(next[0] === current.p){
                    count = current.c+1
                    q.push({p:next[1], c:count})
                } else {
                    count = current.c+1
                    q.push({p:next[0], c:count})
                }
            } 
        }
    }
    if(!flag){
        count = -1
    }
    return count 
}

console.log(bfs())
