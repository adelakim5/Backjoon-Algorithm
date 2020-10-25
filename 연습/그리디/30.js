/*
function b30() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString();
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "");
    var flag = false
    var count = 0
    for (var i = 0; i < input.length; i++) {
        if (input[i] === '0') {
            flag = true
            count++
        }
    }
    if (flag) {
        var num = input.split('0').join('').split('')
        var visit = Array(num.length).fill(false)
        var result = [0]
        com(num, '', num.length, result, visit)
        console.log(result[0] * Math.pow(10, count))
    } else {
        console.log(-1)
    }


}
*/
function b30() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString();
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().trim();
    var nums = input.split('').sort((a, b) => b / 1 - a / 1)
    var sum = nums.reduce((a, b) => a / 1 + b / 1)
    var answer = -1
    if (nums[nums.length - 1] == '0' && sum % 3 == 0) {
        console.log("here")
        answer = nums.join('') / 1
    }
    console.log(answer)
}
/*
function com(numbers, str, len, result, visit) {
    if (str.length === len) {
        if ((str / 1) % 3 === 0 && result[0] < str / 1) {
            result[0] = str
        }
        return
    }
    var tempNum = numbers.slice()
    for (var i = 0; i < tempNum.length; i++) {
        if (!visit[i]) {
            var s = tempNum[i] + ""
            visit[i] = true
            com(tempNum, str + s, len, result, visit)
            visit[i] = false
        }
    }
}
*/
var a = eval("8+0+8+7+5+5+4+2")
// b30()
console.log(a)