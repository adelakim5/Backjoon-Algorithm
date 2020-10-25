var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var t = Number(input.shift())
var ways = Array(t)
var answer = ''
var floyd = []
var n = 0

if (t <= 1) {
    n = input[0] / 1
    var temp = []
    for (var i = 1; i <= n + 2; i++) {
        temp.push(input[i].split(' ').map((e) => e / 1))
    }
    ways[0] = temp
    console.log("ways:", ways)
    floyd = setFloyd(ways[0])
    if (isPossible(floyd)) {
        answer = 'happy'
    } else {
        answer = 'sad'
    }
} else {
    var index = 0
    var waysIndex = 0
    while (waysIndex !== t) {
        n = input[index] / 1
        // console.log("n", n)
        var temp = []
        for (var i = index + 1; i <= index + n + 2; i++) {
            temp.push(input[i].split(' ').map((e) => e / 1))
        }
        // console.log("temp", temp)
        ways[waysIndex] = temp
        // console.log("ways", ways)
        index = index + n + 2 + 1
        // console.log("index", index)
        waysIndex++
        // console.log("waysIndex", waysIndex)
    }

    for (var idx = 0; idx < ways.length; idx++) {
        console.log("idx", idx, "ways.length", ways.length)
        floyd = setFloyd(ways[idx], '2')
        if (isPossible(floyd)) {
            console.log("current idx", idx)
            answer += 'happy' + '\n'
            // console.log(answer.trim())
        } else {
            console.log("current idx", idx)
            answer += 'sad' + '\n'
        }
    }
}
console.log(answer.trim())

function isPossible(floyd) {
    var homeToFestival = floyd[0][floyd[0].length - 1]
    if (homeToFestival === Infinity) return false
    return true
}

function setFloyd(ways_index) {
    var floyd = initFloyd(ways_index)
    console.log("floyd", floyd)
    console.log("f idx:", idx)
    for (var i = 0; i < floyd.length; i++) {
        console.log("next floyd", floyd)
        for (var j = 0; j < floyd.length; j++) {
            if (j === i) continue
            for (var k = 0; k < floyd.length; k++) {
                // if(floyd[j][i] !== Infinity && floyd[i][k] !== Infinity){
                if (floyd[j][i] !== Infinity && floyd[i][k] !== Infinity && floyd[j][i] + floyd[i][k] < floyd[j][k]) {
                    floyd[j][k] = floyd[j][i] + floyd[i][k]
                    console.log("j, i, k", j, i, k, "changed floyd", floyd)
                }
                // }
            }
        }
    }
    return floyd
}

function initFloyd(ways_index) {
    var floyd = []
    var current = ways_index
    console.log("current", current)
    for (var i = 0; i < current.length; i++) {
        floyd.push(Array(current.length).fill(Infinity))
        floyd[i][i] = 0
    }
    for (var i = 0; i < current.length; i++) {
        var now = current[i]
        for (var j = 0; j < current.length; j++) {
            if (j === i) continue
            var value = Math.abs(current[j][0] - now[0]) + Math.abs(current[j][1] - now[1])
            if (value <= 1000) {
                floyd[i][j] = value
            }
        }
    }
    return floyd
}