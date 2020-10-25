function nQueen() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = parseInt(input[0])
    var col = new Array(n).fill(0)
    var count = []
    backTracking(col, 0, n, count)

    console.log(count.length)

}

function backTracking(col, row, n, count) {
    if (row == n) {
        console.log(col.join(' '))
        count.push(col.join(" "))
        return;
    }

    console.log( "row:",row)
    for (var i = 0; i < n; i++) {
        col[row] = i
        if (isRightPosition(row, i, col)) {
            backTracking(col, row + 1, n, count)
        }
    }
}

function isRightPosition(row, y, col) {
console.log("col??:",col)

for (var a = 0; a < row; a++) {
    console.log("col[a]:",col[a])
    console.log("y:",y)
        if (col[a] == y || Math.abs(row - a) == Math.abs(y - col[a]))
            return false
    }
    return true
}

nQueen()