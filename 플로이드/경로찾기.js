var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = input[0] / 1
var graph = []
for (var i = 1; i < input.length; i++) {
    graph.push(input[i].split(' '))
}
if (n === 1) {
    console.log(...graph[0])
} else {
    // console.log(graph)
    var visit = []
    for (var i = 0; i < n; i++) {
        visit.push(Array(n).fill(false))
    }

    function initVisit() {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                visit[i][j] = false
            }
        }
        return visit
    }
    // console.log(visit)
    function setOneOrZeroAsElements(result) {
        var str = Array(n).fill('0')
        for (var i = 0; i < result.length; i++) {
            str[result[i]] = '1'
        }
        return str.join(' ')
    }
    var answer = ''
    for (var i = 0; i < n; i++) {
        var result = []
        visit = initVisit()
        dfs(i, result)
        // console.log("result", result)
        // result = bfs(i, result)
        answer += setOneOrZeroAsElements(result) + '\n'
    }
    console.log("ans:", "\n" + answer.trim())

    function dfs(vertex, result) {
        var currentRow = graph[vertex]
        console.log(currentRow)
        var currentVisit = visit[vertex]
        // console.log("currentRow", currentRow, "currentVisit", currentVisit)
        for (var i = 0; i < n; i++) {
            if (currentRow[i] === '1' && currentVisit[i] === false) {
                result.push(i)
                currentVisit[i] = true
                // console.log("result:", result, "currentVisit:", currentVisit)
                dfs(i, result)
            }
        }
        // console.log("before return result:", result)
        return result
    }

    function bfs(vertex, result){
        var q = []
        var currentRow = []
        var currentVisit = []
        currentVisit[vertex] = true
        q.push(vertex)
        while(q.length !== 0){
            vertex = q.pop()
            currentVisit = visit[vertex]
            currentRow = graph[vertex]
            for(var i=0; i<currentRow.length; i++){
                if(currentRow[i] === '1' && currentVisit[i] === false){
                    currentVisit[i] = true
                    q.push(i)
                    result.push(i)
                }
            }
        }
        return result
    }
}