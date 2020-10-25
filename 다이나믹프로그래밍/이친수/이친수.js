const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim();
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
let dp = Array(input / 1 + 1).fill(0)
dp[0] = BigInt(0)
dp[1] = BigInt(1)
dp[2] = BigInt(1)
if (input > 2) {
    for (let i = 3; i <= input / 1; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
}
console.log(dp[input].toString())