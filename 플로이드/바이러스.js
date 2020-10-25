var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = input[0] / 1
var coupleComputer = input[1] / 1

if (n <= 1){
    console.log(0)
} else {
    var networks = []
    for (var i = 2; i < input.length; i++) {
        networks.push(input[i].split(' ').map((element) => element / 1))
    }
   
    var connectedStatus = makeConnectedStatus()

    for (var i = 0; i < coupleComputer; i++) {
        var network = networks[i]
        if (!isConnected(network)) {
            connectedStatus = setConnectedStatus(network)
        }
    }

    var answer = howManyInfected(connectedStatus)
    console.log(answer)
}

function makeConnectedStatus(){
    var connectedStatus = Array(n + 1)
    for (var i = 0; i <= n; i++) {
        connectedStatus[i] = i
    }
    return connectedStatus
}

function isConnected(network) {
    var one = network[0]
    var theOhter = network[1]
    if (connectedStatus[one] !== connectedStatus[theOhter]) return false
    return true
}

function setConnectedStatus(network) {
    var checkVar = connectedStatus[network[1]]
    var resultValue = connectedStatus[network[0]]
    for (var i = 0; i < connectedStatus.length; i++) {
        if (connectedStatus[i] === checkVar) {
            connectedStatus[i] = resultValue
        }
    }
    return connectedStatus
}

function howManyInfected(connectedStatus) {
    var count = 0
    for (var i = 2; i < connectedStatus.length; i++) {
        if (connectedStatus[i] === connectedStatus[1]) count++
    }
    return count
}