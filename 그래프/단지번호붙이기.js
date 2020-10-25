function b2667() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
    var n = parseInt(input[0])
    var group = []
    for (var i = 1; i < input.length; i++) {
        group.push(input[i].split('').map(e => e = e / 1))
    }
    // console.log("group", group)
    var homes = isHome(group)
    // console.log("homes", homes)
    var answer = []
    for (var i = 0; i < homes.length; i++) {
        if (homes[i].visit == false) {
            // var result = []
            var startV = homes[i]
            console.log("startV:", startV)
            answer.push(dfs(homes, startV, n))
        }
    }
    answer.sort((a, b) => a - b)
    console.log(answer.length)
    for (var i = 0; i < answer.length; i++) {
        console.log(answer[i])
    }
}

function bfs(homes, startV, n){
    var q = []
    var result = []
    startV.visit = true
    q.push(startV)
    while(q.length !== 0){
        var current = q.shift()
        result.push(current)
        var dx = [-1, 1, 0, 0]
        var dy = [0, 0, -1, 1]
        for (var i = 0; i < 4; i++) {
            var a = current.x + dx[i]
            var b = current.y + dy[i]
            if ((a >= 0 && a < n) && (b >= 0 && b < n)) {
                if (homes.some(e => e.x == a && e.y == b && e.visit == false)) {
                    var idx = homes.findIndex(e => e.x == a && e.y == b && e.visit == false)
                    var next = homes[idx]
                    next.visit = true
                    q.push(next)
                }
            }
        }
    }
    return result.length
}

function recursion_dfs(homes, startV, n, result) {
    result.push(startV)
    startV.visit = true
    var current = startV

    var dx = [-1, 1, 0, 0]
    var dy = [0, 0, -1, 1]
    for (var i = 0; i < 4; i++) {
        var a = current.x + dx[i]
        var b = current.y + dy[i]
        if ((a >= 0 && a < n) && (b >= 0 && b < n)) {
            if (homes.some(e => e.x == a && e.y == b && e.visit == false)) {
                var idx = homes.findIndex(e => e.x == a && e.y == b && e.visit == false)
                recursion_dfs(homes, homes[idx], n, result)
            }
        }
    }
    return result.length
}

function dfs(homes, startV, n) {
    var stack = []
    var result = []
    startV.visit = true
    stack.push(startV)
    result.push(startV)
    // console.log("stack:", stack)
    // console.log("result", result)
    while (stack.length !== 0) {
        var current = stack[stack.length - 1]
        // console.log("current:", current)
        var flag = false
        var dx = [-1, 1, 0, 0]
        var dy = [0, 0, -1, 1]
        for (var i = 0; i < 4; i++) {
            var a = current.x + dx[i]
            var b = current.y + dy[i]
            // console.log("a:", a, "b:", b)
            console.log("here homs:", homes)
            if ((a >= 0 && a < n) && (b >= 0 && b < n)) {
                // console.log("---------------")
                if (homes.some(e => e.x == a && e.y == b && e.visit == false)) {
                    // console.log("??????????????????????")
                    var idx = homes.findIndex(e => e.x == a && e.y == b && e.visit == false)
                    var next = homes[idx]
                    // console.log("next", next)
                    next.visit = true
                    stack.push(next)
                    result.push(next)
                    // console.log("stack:", stack, "result:", result)
                    flag = true
                    break
                }
            }
        }
        if (!flag) {
            stack.pop()
        }
    }
    return result.length
}

function isHome(group) {
    var result = []
    for (var i = 0; i < group.length; i++) {
        for (var j = 0; j < group.length; j++) {
            if (group[i][j] == 1) result.push({
                x: i,
                y: j,
                visit: false
            })
        }
    }
    return result
}

b2667()