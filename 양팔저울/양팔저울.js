function b2629() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString();
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var chuCount = parseInt(input[0])
    var chuWeight = input[1].split(' ').map(e => e = parseInt(e))
    var checkCount = parseInt(input[2])
    var checkWeight = input[3].split(' ').map(e => e = parseInt(e))
    console.log(chuCount, chuWeight, checkCount, checkWeight)
    var ans = []
    calCase(chuCount, chuWeight, [], ans)
    console.log("ans:", ans)
    backtrack(ans, chuWeight, checkWeight)

}

function backtrack(ans, chuWeight, checkWeight) {
    var temp = []
    var str = ''
    for (var i = 0; i < ans.length; i++) {
        var answer = isPromising(ans[i], chuWeight)
        if (isCheck(answer, checkWeight)) {
            str += 'Y '
        }

    }
    console.log("bt temp:", temp)
}

function isCheck(answer, checkWeight) {
    for (var i = 0; i < checkWeight.length; i++) {
        var ptr = checkWeight[i]
        for (var j = 0; j < answer.length; j++) {
            var involve = answer[j].temp
            if (involve.includes(ptr)) {
                return true
            }
        }
    }
    return false
}

function findValue() {
    var d = ["+", "-"]
    for (var k = 0; k < 2; k++) {
        for (var l = 0; l < answer.length; l++) {

        }
    }
}


function isPromising(ansEl, chuWeight) {
    var temp = []
    var result = []
    for (var i = 0; i < chuWeight.length; i++) {
        var chu = chuWeight[i]
        console.log("chu:", chu)
        var count = ansEl[i]
        console.log("count:", count)
        var index = chu
        console.log("index:", index)
        while (temp.length !== count) {
            temp.push(index)
            console.log("temp:", temp)
            index += chu
            console.log("change idx:", index)
        }
        result.push({
            chu: chu,
            temp: temp

        })
        temp = []
    }
    console.log("rst:", result)
    return result
    /*
    var str = ''
    for(var j=0; j<checkWeight.length; j++){
        if(result.includes(checkWeight[j])){
            str = str+'Y'+" "
        } else {
            str = str+'N'+" "
        }
    }
    return str
    */
}

// 빼기


function calCase(chuCount, chuWeight, array, ans) {
    var temp = array.slice()
    if (array.length === 0) {
        for (var i = 1; i < chuCount; i++) {
            temp.push(i)
            calCase(chuCount, chuWeight, temp, ans)
            temp.pop()
        }

    } else {
        if (temp.length === chuWeight.length) {
            var sum = temp.reduce((a, b) => a + b)
            if (sum === chuCount) {
                ans.push(temp)
            }
            return
        }

        for (var i = 1; i < chuCount; i++) {
            var check = temp.reduce((a, b) => a + b)
            if (check + i <= chuCount) {
                temp.push(i)
                calCase(chuCount, chuWeight, temp, ans)
                temp.pop()
            }
        }
    }

}
b2629()