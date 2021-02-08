function b1260() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
    var info = input[0].split(' ')
    console.log(input)
    var n = info[0] / 1
    var m = info[1] / 1
    var startV = info[2] / 1
    var link = []
    for (var i = 1; i < input.length; i++) {
        link.push(input[i].split(' ').map(e => e = e / 1))
    }
    // console.log("info",n,m,startV ,"link", link)
    var graph = makeGraph(n, link)
    console.log("gra:", graph)
    // var d = dfs(startV, visit, graph, result)
    var d = stackDfs(startV, graph, n)
    var b = bfs(startV, graph, n)
    console.log("d:", d.join(' '))
    console.log("b:", b.join(' '))
}

function stackDfs(startV, graph, n){
    var stack = []
    var visit = Array(n).fill(false)
    var result = []

    stack.push(startV)
    visit[startV-1] = true
    result.push(startV)

    while(stack.length!==0){
        var current = stack[stack.length-1]
        var flag = false
        for(var i=0; i<graph[0].length; i++){
            if((graph[current-1][i] == 1) &&(visit[i]== false)){
                stack.push(i+1)
                visit[i] = true
                result.push(i+1)
                flag = true
                break
            }
        }

        if(!flag){
            stack.pop()
        }
    }

    return result
}

function dfs(startV, visit, graph, result) {
    console.log("startV:", startV)
    result.push(startV)
    visit[startV - 1] = true
    var current = startV - 1
    // console.log("current gra:", graph[current])
    for (var i = 0; i < graph[0].length; i++) {
        if (graph[current][i] == 1 && visit[i] == false) {
            dfs(i + 1, visit, graph, result)
        }
    }
    return result
}

function bfs(startV, graph, n) {
    var q = []
    var visit = Array(n).fill(false)
    var result = []

    q.push(startV)
    visit[startV - 1] = true

    while (q.length !== 0) {
        var current = q.shift()
        result.push(current)

        for (var i = 0; i < graph[0].length; i++) {
            if (graph[current - 1][i] == 1 && visit[i] == false) {
                q.push(i + 1)
                visit[i] = true
            }
        }
    }

    return result
}

function makeGraph(n, link) {
    var arr = []
    for (var i = 0; i < n; i++) {
        arr.push(Array(n).fill(0))
    }
    for (var i = 0; i < link.length; i++) {
        var x = link[i][0]
        // console.log(x)
        var y = link[i][1]
        // console.log(y)
        if (arr[x - 1][y - 1] === 0 && arr[y - 1][x - 1] === 0) {
            arr[x - 1][y - 1] = 1
            arr[y - 1][x - 1] = 1
        }
        // console.log(arr)
    }
    // console.log(arr)
    return arr
}


b1260()