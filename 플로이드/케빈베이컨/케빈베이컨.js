var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var peopleInfo = input[0].split(' ').map((e) => +e)
var n = peopleInfo[0]
var m = peopleInfo[1]
var relationships = []
for (var i = 1; i < input.length; i++) {
    relationships.push(input[i].split(' ').map((e) => +e))
}
console.log(relationships)
var floyd = setFloyd()
var answer = KevinBaconOfEach(floyd)
console.log(answer)

function initFloyd() {
    var floyd = []
    for (var i = 0; i < n; i++) {
        floyd.push(Array(n).fill(Infinity))
        floyd[i][i] = 0
    }
    for (var i = 0; i < relationships.length; i++) {
        var currentRelationship = relationships[i]
        if (floyd[currentRelationship[0] - 1][currentRelationship[1] - 1] !== 1) {
            floyd[currentRelationship[0] - 1][currentRelationship[1] - 1] = 1
            floyd[currentRelationship[1] - 1][currentRelationship[0] - 1] = 1
        }
    }
    console.log(floyd)
    return floyd
}

function setFloyd() {
    var floyd = initFloyd()
    for (var i = 0; i < n; i++) {
        for (var s = 0; s < n; s++) {
            if (s === i) continue
            for (var d = 0; d < n; d++) {
                if (floyd[s][i] !== Infinity && floyd[i][d] !== Infinity && floyd[s][d] > floyd[s][i] + floyd[i][d]) {
                    floyd[s][d] = floyd[s][i] + floyd[i][d]
                }
            }
        }
    }
    console.log(floyd)
    return floyd
}

function KevinBaconOfEach(floyd) {
    var sum = floyd[0].reduce((a, b) => a + b)
    var min = sum
    var index = 0
    for (var i = 1; i < floyd.length; i++) {
        sum = floyd[i].reduce((a, b) => a + b)
        if(sum < min){
            min = sum
            index = i
        }
    }
    return index+1
}

setFloyd()