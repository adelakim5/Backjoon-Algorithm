function b2887() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var star = parseInt(input[0])
    console.log("star: ", star)
    var link = []
    for (var k = 1; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))
    }
    // link = link.sort((a, b) => a[2] - b[2])
    console.log("link: ", link)
    var count = 0
    var temp = []
    var edge = []
    while (true) {
        var start = link[count]
        console.log("start:", start)
        for (var i = 0; i < link.length; i++) {

            var partner = link[i]
            var x = Math.abs(start[0]) - Math.abs(partner[0])
            var y = Math.abs(start[1]) - Math.abs(partner[1])
            var z = Math.abs(start[2]) - Math.abs(partner[2])
            var min = Math.min(x, y, z)
            temp.push(min)
            console.log("min:", min, "temp: ", temp)

        }
        if (edge.length === star - 1) {
            break;
        } else {
            link = link.splice(count, 1)
            var minOfMin = temp.indexOf(Math.min(...temp))
            count = minOfMin + 1;
            edge.push(temp[minOfMin])
            temp = []
            console.log("minOfMin: ", minOfMin)
        }
    }
    console.log("edge: ", edge)

}

b2887()