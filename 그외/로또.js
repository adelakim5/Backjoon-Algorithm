function b6603() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var testCase = []
    for (var i = 0; i < input.length - 1; i++) {
        var e = input[i].split(' ')
        e = e.map((e) => parseInt(e))
        testCase.push(e)
    }
    for (var j = 0; j < testCase.length; j++) {
        testCase[j] = testCase[j].slice(1, testCase[j].length)
    }
    // console.log("testCase:", testCase)
    var array = []
    for (var t = 0; t < testCase.length; t++) {
        var ans = []
        for (var a = 0; a < testCase[t].length; a++) {
            backTrack(ans, testCase[t][a], testCase[t], testCase[t][a].toString())
            // console.log("backTrack ans: ", ans)
        }
        array.push(ans)
    }

    for(var l = 0; l<array.length; l++){
        for(var m=0; m<array[l].length; m++){
            console.log(array[l][m])
        }
        console.log()
    }
    // console.log("array: ", array)
    // console.log("ans: ", ans)
}

function backTrack(ans, a, testCase, str) {
    console.log("str: ", str)
    console.log("a: ", a)
    str = str.split(' ').sort((a, b) => a - b)
    if (str.length === 6) {
        str = str.join(' ')
        if (ans.every(e => e !== str)) {
            ans.push(str)
        }
        return;
    }
    var findNextIndex = testCase.findIndex(e => e === a)
    str = str.join(' ')
    for (var i = findNextIndex + 1; i < testCase.length; i++) {
        backTrack(ans, testCase[i], testCase, str + ' ' + testCase[i].toString())
        console.log("a:", a, "backTrack in backTrack: ", ans)
    }

}

b6603()