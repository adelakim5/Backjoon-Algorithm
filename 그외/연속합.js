function successiveSum(){
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var n = parseInt(input[0])
    var successive = input[1].split(' ')
    for(var i=0; i<n; i++){
        successive[i] = successive[i]/1
    }
    var d = Array(n)
    d[0] = successive[0]
    var max = 0
    for(var i=1; i<n; i++){
        max = Math.max(d[i-1]+successive[i], successive[i])
        d[i] = max
    }
    console.log(Math.max.apply(null, d))
}

successiveSum()