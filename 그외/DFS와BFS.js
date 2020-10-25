function b1260() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g,"").split('\n');
    console.log(input);
    var info = input[0].split(' ').map(e=> e/1)
    console.log(info)
    var link = []
    for(var k=1; k<input.length; k++){
        link.push(input[k].split(' ').map(e=>e/1))
    }
    console.log(link)
    
    // var info = [4, 5, 1]
    // var info = [5,5,3]
    // var link = [
    //     [1, 2],
    //     [1, 3],
    //     [1, 4],
    //     [2, 4],
    //     [3, 4]
    // ]

    // var link = [
    //     [5,4],
    //     [5,2],
    //     [1,2],
    //     [3,4],
    //     [3,1]
    // ]

    var graph = []
    for (var j = 0; j <= info[0]; j++) {
        graph.push(new Array(info[0] + 1).fill(0))
    }
    for (var i = 0; i < link.length; i++) {
        graph[link[i][0]][link[i][1]] = 1
        graph[link[i][1]][link[i][0]] = 1
    }
    console.log(graph)

    var visited = new Array(info[0]).fill('F')
    console.log(dfs(info[0], graph, visited, info[2], [], []))
    visited = new Array(info[0]).fill('F')
    console.log(bfs(info[0], graph, visited, info[2], [], []))
    // console.log(dfsAnswer, "\n", bfsAnswer)
    // console.log(bfsAnswer)
}

function bfs(number, graph, visited, next, q, bfsAnswer) {
    while (true) {
        visited[next - 1] = 'T'
        console.log("bfs visited", visited)
        if (bfsAnswer.length == 0 || bfsAnswer.every(e => e !== next)) {
            bfsAnswer.push(next)
        }
        if(bfsAnswer.length == number){
            break
        } else {
            for (var a = 0; a < graph[next].length; a++) {
                if (graph[next][a] == 1 && visited[a - 1] === 'F') {
                    q.push(a)
                    visited[a - 1] = 'T'
                }
            }
            next = q.shift()
        }
    }
 
    return bfsAnswer
}

function dfs(number,graph, visited, next, stack, dfsAnswer) {
    while (true) {
        visited[next - 1] = 'T'
        if (dfsAnswer.length == 0 || dfsAnswer.every(e => e !== next)) {
            dfsAnswer.push(next)
        }
        if(dfsAnswer.length == number){
            break
        }else {
            stack.push(next)
            var connectedVertexs = []
            for (var a = 0; a < graph[next].length; a++) {
                if (graph[next][a] == 1 && visited[a - 1] === 'F') {
                    connectedVertexs.push(a)
                }
            }
            if (connectedVertexs.length === 0) {
                next = stack.pop()
            } else {
                connectedVertexs = connectedVertexs.sort((a, b) => a - b)
                next = connectedVertexs[0]
            }
        }

    }
    return dfsAnswer
}



// }

b1260()