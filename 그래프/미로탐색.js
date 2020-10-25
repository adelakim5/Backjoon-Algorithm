const fs = require("fs");
// const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// const input = fs.readFileSync("./stdin").toString().trim().split("\n");
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

var size = input[0].split(' ')
var n = parseInt(size[0])
var m = parseInt(size[1])
var graph = []
for (let idx = 1; idx < input.length; idx++) {
    graph.push(input[idx].trim().split('').map((element) => parseInt(element)))
}
const moveRows = [1, -1, 0, 0]
const moveCols = [0, 0, 1, -1]
var ways = []
for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
        if (graph[r][c] === 1) ways.push({
            row: r,
            col: c,
            visit: false,
            count: 0
        })
    }
}
console.log(ways)

function bfs() {
    let q = []
    let result = {}
    let current = ways[0]
    current.count += 1
    current.visit = true
    q.push(current)
    result = current
    while (!isLast(result)) {
        current = q.shift()
        result = current
        for (let i = 0; i < 4; i++) {
            let nextCols = current.col + moveCols[i]
            let nextRows = current.row + moveRows[i]
            if ((nextCols >= 0 && nextCols < m) && (nextRows >= 0 && nextRows < n)) {
                let isExist = (element) => element.row === nextRows && element.col === nextCols && element.visit === false
                let index = ways.findIndex(isExist)
                if (index !== -1) {
                    let next = ways[index]
                    next.visit = true
                    next.count = current.count + 1
                    q.push(next)
                }
            }
        }
    }
    return result.count
}

function isLast(last) {
    if (last.row === n - 1 && last.col === m - 1) return true
    return false
}

console.log(bfs())

/*
function maze(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
    var size = input[0].split(' ')
    var n = size[0]/1
    var m = size[1]/1
    console.log("n", n, "m", m)
    var graph = []
    for(var i=1; i<input.length; i++){
        graph.push(input[i].split('').map((element)=> element/1))
    }
    var ways = findWay(graph, m, n)
    console.log("ways:", ways)
    var answer = bfs(ways[0], ways, m, n)
    console.log("ways[0]",ways[0],"answer:", answer)
    console.log(answer.count)
}

function findWay(graph, m, n){
    var ways = []
    for(var i=0; i<n; i++){
        for(var j=0; j<m; j++){
            if(graph[i][j] === 1) ways.push({row:i, col:j, visit:false, count:0})
        }
    }
    return ways
}

function bfs(startV, ways, m, n){
    var q = []
    var result = []
    startV.count += 1
    startV.visit = true
    q.push(startV)
    result.push(startV)
    while(!isLast(result, m, n)){
        var current = q.shift()
        for(var i=0; i<4; i++){
            var moveRows = [1,-1, 0, 0]
            var moveCols = [0, 0, 1, -1]
            var nextCols = current.col + moveCols[i]
            var nextRows = current.row + moveRows[i]
            if((nextCols>=0 && nextCols<m) && (nextRows>=0 && nextRows<n)){
                const isExist = (element) => element.row === nextRows && element.col === nextCols && element.visit === false
                const index = ways.findIndex(isExist)
                if( index !== -1){
                    const next = ways[index]
                    next.visit = true
                    next.count = current.count + 1
                    q.push(next)
                    result.push(next)
                }
            }
        }
    }
    return result[result.length-1]
}

function isLast(result, m, n){
    var last = result[result.length-1]
    if(last.row === n-1 && last.col === m-1) return true
    return false
}

maze()

*/