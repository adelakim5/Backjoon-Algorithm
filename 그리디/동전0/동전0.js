var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var info = input[0].split(' ')
var n = info[0] / 1
var k = info[1] / 1
var moneys = []
for (var i = 1; i < input.length; i++) {
    moneys.push(input[i].trim() / 1)
}

var count = 0
while (k !== 0) {
    var max = moneys[moneys.length - 1]
    if (max <= k) {
        k -= max
        count++
    } else {
        moneys.pop()
    }
}
console.log(count)


/*
var count = 0
var tempStr = ''
var tempK = reverseK(k)

function selectMoney() {
    console.log("tk",tempK)
    for (var i = moneys.length - 1; i >= 0; i--) {
        if(tempK.length === 0) break
        var mok = Math.floor(i / 2)
        if (mok === tempK.length - 1) {
            if (tempk[tempK.length - 1] < 5) {
                count += tempK[tempK.length - 1]
            } else {
                var difference = tempK[tempK.length - 1] - 5
                count += difference
            }
            tempStr += tempK.pop()
        }
        if(mok < 1 && )
    }
    return count 
}

function reverseK(k) {
    return k.split('').reverse().map((element) => element / 1)
}

console.log("str:", tempStr)
console.log(selectMoney())
*/