var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var t = input[0] / 1
var ns = []
for (var i = 1; i < input.length; i++) {
    ns.push(input[i]/1)
}
console.log(ns)
var dp = []
dp[0] = [1, 0]
dp[1] = [0, 1]
for (var idx = 2; idx < 41; idx++) {
    dp[idx] = [(dp[idx - 1][0] + dp[idx - 2][0]), (dp[idx - 1][1] + dp[idx - 2][1])]
}
console.log("dp:", dp)
var n = ''
for(var i=0; i<ns.length; i++){
    // console.log(ns[i])
    n += dp[ns[i]].join(' ') + '\n'
}
console.log("answer:", n)



