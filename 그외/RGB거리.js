function b1149() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var n = parseInt(input[0])
    var paint = []
    for (var i = 1; i < input.length; i++) {
        var c = input[i].split(' ').map(e => e = e / 1)
        paint.push(c)
    }
    var d = Array(paint.length).fill(0)
    for(var i=0; i<d.length; i++){
        d[i] = [0, 1, 2]
    }
    d[0][0] = paint[0][0]
    d[0][1] = paint[0][1]
    d[0][2] = paint[0][2]
    for(var j=1; j<n; j++){
        d[j][0] = Math.min(d[j-1][1], d[j-1][2]) + paint[j][0]
        d[j][1] = Math.min(d[j-1][0], d[j-1][2]) + paint[j][1]
        d[j][2] = Math.min(d[j-1][0], d[j-1][1]) + paint[j][2]
    }
    console.log(Math.min.apply(null, d[n-1]))
}



b1149()