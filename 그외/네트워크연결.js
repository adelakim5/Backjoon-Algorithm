function b1922() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var computer = parseInt(input[0])
    var networks = parseInt(input[1])
    console.log("com: ", computer, "net: ", networks)
    var link = []
    for (var k = 2; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))
    }
    link = link.sort((a, b) => a[2] - b[2])
    console.log("link: ", link)

    var cycleTable = new Array(computer + 1);
    for (var i = 0; i < cycleTable.length; i++) {
        cycleTable[i] = i
    }

    console.log("cycle: ", cycleTable)
    var count = 0
    var edge = []
    var answer = 0
    while (true) {
        var current = link[count]
        if (cycleTable[current[1]] !== cycleTable[current[0]]) {
            // cycleTable[current[1]] = cycleTable[current[0]]
            if (cycleTable.some(e => e == cycleTable[current[1]])) {
                for (var c = 0; c < cycleTable.length; c++) {
                    if (cycleTable[c] === cycleTable[current[1]]) {
                        cycleTable[c] = cycleTable[current[0]]
                        console.log("current: ", current, "cycleTable process: ", cycleTable)
                    }
                }
            }
            if (edge.length === 0) {
                edge.push(current[2])
            } else {
                edge.push(edge[edge.length - 1] + current[2])
            }
        }
        if (edge.length === computer - 1) {
            answer = edge[edge.length - 1]
            break;
        }
        count++;
    }


    console.log(answer)
}


b1922()