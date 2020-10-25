function b2156(){
    var wines = [6, 6, 10, 1, 2, 9, 8]
    var n = wines[0]
    var dp = new Array(n+1).fill(0)
    dp[0] = 0
    dp[1] = wines[1]
    dp[2] = wines[1]+wines[2]
    for(var i=3; i<=n; i++){
       dp[i] = Math.max(dp[i-3]+wines[i-1]+wines[i], dp[i-2]+wines[i], dp[i-1]) 
    }
    console.log(dp)
}
// b2156()
p()

function p(){
    var wines = [6, 10, 1, 2, 9, 8]
    var n = wines[0]
    var dp = new Array(n).fill(0)
    dp[0] = wines[0]
    dp[1] = wines[0]+wines[1]
    dp[2] = Math.max(dp[0]+wines[2], wines[1]+wines[2], dp[1]) 
    for(var i=3; i<n; i++){
       dp[i] = Math.max(dp[i-3]+wines[i-1]+wines[i], dp[i-2]+wines[i], dp[i-1]) 
    }
    console.log(dp)
}
/*var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split('\n');    
// input으로 들어온 입력값을 정수형으로 바꿔주기 
for(var j=0; j<input.length; j++){
    input[0] = parseInt(input[j])
}
var n = input[0]
var wines = input.slice(1, input.length)*/