function b1463() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "");
    var n = parseInt(input)
    console.log("n", n)
    var d = Array(n + 1).fill(0)
    d[1] = 0
    d[2] = 1
    d[3] = 1
    var min = 0

    for (var i = 4; i <= n; i++) {
        var a = n
        var b = n
        var c = n
        if (i % 2 === 0) {
            a = d[i / 2] + 1
        }
        if (i % 3 === 0) {
            b = d[i / 3] + 1
        }
        c = d[i - 1] + 1
        min = Math.min(a, b, c)
        d[i] = min
    }
    console.log(d[n])
}

b1463()