var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = input[0] / 1
var m = input[1] / 1
var busRoutes = []
for (var i = 2; i < input.length; i++) {
    busRoutes.push(input[i].split(' ').map((element) => element / 1))
}

// console.log(busRoutes)

var max = 1000001

function setEmptyGraph() {
    var graph = []
    for (var i = 0; i < n; i++) {
        graph.push(Array(n).fill(max))
        graph[i][i] = 0
    }
    return graph
}

function createNxtGraph() {
    var graph = []
    for (var i = 0; i < n; i++) {
        graph.push(Array(n).fill(null))
    }
    return graph
}

function setInitialFloyd() {
    var floydGraph = setEmptyGraph()
    var nxtGraph = createNxtGraph()
    for (var i = 0; i < busRoutes.length; i++) {
        var departure = busRoutes[i][0]
        var arrival = busRoutes[i][1]
        var busRoute = busRoutes[i][2]
        if (busRoute < floydGraph[departure - 1][arrival - 1]) {
            floydGraph[departure - 1][arrival - 1] = busRoute
            nxtGraph[departure - 1][arrival - 1] = arrival - 1
        }
    }
    console.log("floydGraph:", floydGraph)
    console.log("nxtGraph:", nxtGraph)
    return [floydGraph, nxtGraph]
}

function findAnswerWithFloyd(Graphs) {
    var floydGraph = Graphs[0]
    var nxtGraph = Graphs[1]
    for (var i = 0; i < floydGraph.length; i++) {
        for (var j = 0; j < floydGraph.length; j++) {
            if (j === i) continue
            else {
                for (var k = 0; k < n; k++) {
                    if (floydGraph[j][i] !== max && floydGraph[i][k] !== max) {
                        var floydBusRoute = floydGraph[j][i] + floydGraph[i][k]
                        if (floydBusRoute < floydGraph[j][k]) {
                            console.log("j, i, k", j, i, k)
                            floydGraph[j][k] = floydBusRoute
                            console.log("change floydGraph", floydGraph)
                            nxtGraph[j][k] = nxtGraph[j][i]
                            console.log("change nxtGraph", nxtGraph)
                        }
                    }
                }
            }
        }
        // console.log("after", floydGraph)
    }
    return [floydGraph, nxtGraph]
}

function trackPaths(nxtGraph) {
    var element = []
    var result = []
    for (var i = 0; i < nxtGraph.length; i++) {
        for (var j = 0; j < n; j++) {
            var currentVertex = nxtGraph[i][j]
            if (currentVertex === null) {
                element = [0]
                // console.log("j:",j, "element currentVertex === null", element)
            } else if (currentVertex === j) {
                element = []
                element.push(i + 1, currentVertex + 1)
                // console.log("j:",j,"element currentVertex === j", element)
            } else {
                element = []
                element.push(i + 1)
                while (true) {
                    if(currentVertex === j){
                        element.push(currentVertex+1)
                        break;
                    }
                    element.push(currentVertex + 1)
                    currentVertex = nxtGraph[currentVertex][j]
                }
                // console.log("j:",j,"element currentVertex !== j", element)
            }
            result.push(element)
        }
    }
    return result
}

function changeMaxtoZero(Graphs) {
    var floydGraph = Graphs[0]
    var nxtGraph = Graphs[1]
    for (var i = 0; i < floydGraph.length; i++) {
        for (var j = 0; j < n; j++) {
            if (floydGraph[i][j] === max) floydGraph[i][j] = 0
            // if(nxtGraph[i][j] === null) nxtGraph[i][j] = 0
        }
    }
    return [floydGraph, nxtGraph]
}

if (n === 1) {
    console.log(0)

} else {
    var Graphs = setInitialFloyd()
    Graphs = findAnswerWithFloyd(Graphs)
    Graphs = changeMaxtoZero(Graphs)
    var floydGraph = Graphs[0]
    var nxtGraph = Graphs[1]
    var nxtGraphResult = trackPaths(nxtGraph)
    // console.log(nxtGraphResult)
    print(floydGraph, nxtGraphResult)
}


function print(floydGraph, nxtGraphResult) {
    var answer = ''
    var count = 0
    for (var i = 0; i < floydGraph.length; i++) {
        answer += floydGraph[i].join(' ') + '\n'
    }
    for (var i = 0; i < nxtGraphResult.length; i++) {
        if (nxtGraphResult[i].length === 1 && nxtGraphResult[i][0] === 0) {
            answer += '0' + '\n'
            continue
        }
        count = nxtGraphResult[i].length
        answer += count + " " + nxtGraphResult[i].join(' ') + '\n'
    }
    console.log(answer.trim())
}

// setFloyd()