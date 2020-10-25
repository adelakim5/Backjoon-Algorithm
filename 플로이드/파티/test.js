var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var informations = input[0].split(' ')
var n = +informations[0]
var m = +informations[1]
var x = +informations[2]
var answer = 0
if (n === 1) {
    console.log(answer)
} else {
    var mapInformations = []
    for (var i = 1; i < input.length; i++) {
        mapInformations.push(input[i].split(' ').map((e) => +e))
    }
    console.log(mapInformations)
    var floyd = setFloyd()
    answer = findMaxtimeOfRoundTrip(floyd)
    console.log(answer)

    function findMaxtimeOfRoundTrip(floyd) {
        var timeFromDestination = floyd[x - 1]
        var max = 0
        for (var i = 0; i < floyd.length; i++) {
            var oneWayToDestination = floyd[i][x - 1]
            timeFromDestination[i] += oneWayToDestination
            if (max < timeFromDestination[i]) {
                max = timeFromDestination[i]
            }
        }
        return max
    }

    function setFloyd() {
        var floyd = initFloyd()
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (j === i) continue
                for (var k = 0; k < n; k++) {
                    if (floyd[j][i] !== Infinity && floyd[i][k] !== Infinity && floyd[j][k] > floyd[j][i] + floyd[i][k]) {
                        floyd[j][k] = floyd[j][i] + floyd[i][k]
                    }
                }
            }
        }
        console.log("floyd", floyd)
        return floyd
    }

    function initFloyd() {
        var floyd = []
        for (var i = 0; i < n; i++) {
            floyd.push(Array(n).fill(Infinity))
            floyd[i][i] = 0
        }
        for (var i = 0; i < mapInformations.length; i++) {
            var s = mapInformations[i][0]
            var d = mapInformations[i][1]
            var w = mapInformations[i][2]
            floyd[s - 1][d - 1] = w
        }
        return floyd
    }
}