function b1012() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
    var t = parseInt(input[0])
    input.shift()
    var count = 0
    var i = 1
    var answer = []
    while(t !== count){
        // console.log("here!!!!")
        var testCaseInfo = input[i-1].split(' ')
        var m = parseInt(testCaseInfo[0])
        var n = parseInt(testCaseInfo[1])
        var k = parseInt(testCaseInfo[2])
        // console.log("testCase, m, n, k:", testCaseInfo, m, n, k)
        var cabbageLocation = []
        for(var c = i; c<k+i; c++){
            var temp = input[c].split(' ').map((element)=> element/1)
            var y = temp[0]
            var x = temp[1]
            cabbageLocation.push({y: y, x: x, visit: false})
        }
        // console.log("cabbageLocation", cabbageLocation)
        var result = []
        var tempResult = []
        for(var l = 0; l < cabbageLocation.length; l++){
            if(cabbageLocation[l].visit === false){
                var startV = cabbageLocation[l]
                result.push(recursive_dfs(cabbageLocation, m, n, startV, tempResult))
                // result.push(bfs(cabbageLocation, startV, n, m))
                // console.log("after cabbageLocation:", cabbageLocation)
            }
        }
        answer.push(result.length)
        i += k+1
        // console.log("i:", i)
        count++
    }
    for(var a=0; a<answer.length; a++){
        console.log(answer[a])
    }
}

function bfs(cabbageLocation, startV, n, m){
    var q = []
    var result = []
    startV.visit = true
    q.push(startV)
    while(q.length !== 0){
        var current = q.shift()
        result.push(current)
        var dy = [-1, 1, 0, 0]
        var dx = [0, 0, -1, 1]
        for(var i=0; i<4; i++){
            var a = current.y + dy[i]
            var b = current.x + dx[i]
            if((a >= 0 && a < m) && (b >= 0 && b < n)){
                if(cabbageLocation.some(element=> element.y === a && element.x === b && element.visit === false)){
                    var index = cabbageLocation.findIndex(element=> element.y === a && element.x === b && element.visit === false)
                    var next = cabbageLocation[index]
                    next.visit = true
                    q.push(next)
                }
            }
        }
    }
    console.log("result:", result)
    return result 
}
b1012()

function recursive_dfs(cabbageLocation, m, n, startV, result){
    startV.visit = true
    result.push(startV)
    var current = startV
    var dy = [-1, 1, 0, 0]
    var dx = [0, 0, -1, 1]
    for(var i=0; i<4; i++){
        var a = current.y + dy[i]
        var b = current.x + dx[i]
        if((a >= 0 && a < m) && (b >= 0 && b < n)){
            if(cabbageLocation.some(element=> element.y === a && element.x === b && element.visit === false)){
                var index = cabbageLocation.findIndex(element=> element.y === a && element.x === b && element.visit === false)
                var next = cabbageLocation[index]
                recursive_dfs(cabbageLocation, m, n, next, result)
            }
        }
    }
    return result 
}
/*
function makeGraph(m, n, cabbageLocation){
    var temp = Array(m).fill(0)
    var graph = []
    for(var i=0; i<n; i++){
        graph.push(temp)
    }
    for(var i=0; i<cabbageLocation.length; i++){
        var x = cabbageLocation[i][0]
        var y = cabbageLocation[i][1]
        graph[x][y] = 1
    }
    return graph
}
*/