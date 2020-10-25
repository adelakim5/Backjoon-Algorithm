function b1248() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var n = parseInt(input[0])
    var buho = input[1]
    var map = create2DArray(n, n)
    var idx = 0

    for (var i = 0; i < n; i++) {
        for (var j = i; j < n; j++) {
            map[i][j] = buho[idx++]
        }
    }
    console.log("map", map)
    var arr = new Array(n)

    solve(0, arr, map, n)

}

function create2DArray(rows, cols) {
    var arr = new Array(rows)
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols)
    }
    return arr
}

function check(index, arr, map) {
    console.log("index:", index, "arr:", arr)
    for (var i = 0; i <= index; i++) {
        var sum = 0
        for (var j = i; j <= index; j++) {
            sum += arr[j]
            console.log("map[i][j]:", map[i][j])
            console.log("sum:",sum)
            if (map[i][j] !== (sum == 0 ? '0' : (sum > 0 ? '+' : '-'))) {
                return false
            }
        }
    }
    return true
}


function solve(count, arr, map, n) {
    if (count == n) {
        var str = ''
        for (var i = 0; i < n; i++) {
            str += arr[i].toString()+' '
        }
        console.log(str)
        process.exit(0)
    }
    for (var j = -10; j <= 10; j++) {
        arr[count] = j
        if (check(count, arr, map)) {
            solve(count + 1, arr, map, n)
        }
    }
}

b1248()