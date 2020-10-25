// let input = require('fs').readFileSync('/dev/stdin').toString().trim();
let input = require('fs').readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
input = Number(input)
var dp = Array(input + 1).fill(0)
dp[0] = BigInt(0)
dp[1] = BigInt(1)
if (input => 2) {
    for (let i = 2; i <= input; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
}

console.log(dp[input])