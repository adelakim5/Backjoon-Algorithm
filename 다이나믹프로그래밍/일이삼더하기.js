var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');

var dp = []
dp = calculateDp(dp)
var testCases = makeInputNumber()
var answer = dp[testCases[0]].length+""
for (var i = 1; i < testCases.length; i++) {
    var testCase = testCases[i]
    answer += "\n" + dp[testCase].length
}
console.log(answer.trim())

function makeInputNumber() {
    // var t = input[0]/1
    var ns = []
    for (var i = 1; i < input.length; i++) {
        ns.push(input[i] / 1)
    }
    return ns
}

function calculateDp(dp) {
    dp[0] = []
    dp[1] = ['1']
    dp[2] = ['1 1', '2']
    dp[3] = ['1 1 1', '1 2', '2 1', '3']
    for (var i = 4; i < 12; i++) {
        var withOne = combination(dp[1], dp[i - 1])
        // console.log("withOne:", withOne)
        var withTwo = combination(dp[2], dp[i - 2])
        var withThree = combination(dp[3], dp[i - 3])
        var result = mergeThreeArraies(withOne, withTwo, withThree)
        dp[i] = result
    }
    return dp
}

function mergeThreeArraies(one, two, three) {
    two.push(...three)
    one.push(...two)
    var mergedResult = new Set(one)
    return [...mergedResult]
}

function combinePartially(oneArray, theOtherArray) {
    var candidates = []
    var current = ''
    var candidate = ''
    for (var i = 0; i < oneArray.length; i++) {
        current = oneArray[i]
        for (var j = 0; j < theOtherArray.length; j++) {
            candidate = current + ' ' + theOtherArray[j]
            // console.log("candidate:", candidate)
            candidates.push(candidate)
        }
    }
    return candidates
}

function combination(oneArray, theOtherArray) {
    var combinatedResult = combinePartially(oneArray, theOtherArray)
    // console.log("temp:", temp)
    combinatedResult.push(...combinePartially(theOtherArray, oneArray))
    // console.log("push temp:", temp)
    var resultBySet = new Set(combinatedResult)
    // console.log("result:", result)
    return [...resultBySet]
}