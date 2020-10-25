const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim();
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
input = Number(input)
let dp = []
for(let i=0; i<=input; i++){
    dp.push(Array(10).fill(0))
}
for(let i=1; i<=9; i++){
    dp[0][i] = 0
    dp[1][i] = 1
}
let m = 1000000000
for(let i=2; i<=input; i++){
    dp[i][0] = dp[i-1][1]
    dp[i][9] = dp[i-1][8]
    for(let j=1; j<9; j++){
        dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % m
    } 
}
console.log(dp)
let sum = 0
for(let d of dp[input]){
    sum+=d
}
console.log(sum%m)