function b9663() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = parseInt(input[0])
    var queenArray = new Array(n).fill(0)
    var count = []
    backTrack(0, n, count, queenArray)
    console.log(count)
    console.log(count.length)
}

function backTrack(row, n, count, queenArray) {
   console.log("queenArray:", queenArray)
    if (row == n) {
        console.log("row:",row,"count push:",queenArray)
        var str = ''
        for(var c=0; c<queenArray.length; c++){
            str+=queenArray[c].toString()
        }
        count.push(str)
        console.log("count:",count)
        return
    }

    for (var i = 0; i < n; i++) {
        queenArray[row] = i
        if (isPromising(row, i, queenArray)) {
            backTrack(row + 1, n, count, queenArray)
        }
    }
}

function isPromising(row, col, queenArray) {
    console.log("row:",row, "col:",col)
    for (var i = 0; i < row; i++) {
        if (queenArray[i] == col || Math.abs(row - i) == Math.abs(col - queenArray[i])) {
            return false
        }
    }
    return true
}


b9663()