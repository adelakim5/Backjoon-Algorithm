function b1987() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString();
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var number = input[0].split(' ')
    // console.log("input:", input)

    var r = parseInt(number[0])
    var c = parseInt(number[1])
    // console.log("r", r, "c", c)
    var array = new Array(input.length-1)
    for (var i = 1; i < input.length; i++) {
        var ptr = input[i].split('')
        array[i-1] = ptr
    }
    // console.log("array:", array)
    var ans = [array[0][0]]
    var result = ['0']
    backtrack(r, c, array, 0, 0, ans, result)
    console.log("결과",result)
    console.log("total ans:", result[0].length)
 
}

function backtrack(r, c, array, x, y, ans, result) {
    var flag = false
    var tempAns = ans.slice()
    // console.log("current x y :", x, y)
    var dx = [1, -1, 0, 0]
    var dy = [0, 0, 1, -1]
    for (var i = 0; i < 4; i++) {
        if ((x + dx[i] >= 0 && x + dx[i] < r) && (y + dy[i] >= 0 && y + dy[i] < c)) {
            if (!tempAns.includes(array[x + dx[i]][y + dy[i]])) {
                // if(isCheck(tempAns, result)){
                tempAns.push(array[x + dx[i]][y + dy[i]])
                // if(tempAns.length < result[result.length-1].length){
                flag = true
                backtrack(r, c, array, x + dx[i], y + dy[i], tempAns, result)
                flag = false
                tempAns.pop()
                // }
                // console.log("tempans:", tempAns)
                // }
            }
        }
    }
    if (flag == false) {
        // console.log("is result?", result)
        if(result.length === 0){
            result[0] = tempAns
        } else {
            if(tempAns.length > result[0].length){
                result[0] = tempAns
            }
        }
        // console.log("is result?", result)
       
        return
    }

}
/*
function isCheck(tempAns, result) {
    if (result.length === 0) return true
    else if (tempAns.length < result[result.length - 1].length) return true

    return false
}
*/

b1987()