function sudoku2() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var link = []
    for (var k = 0; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))
    }
    var emptyArray = whereIsEmptyPoint(link, [])
    console.log("emptyArray: ", emptyArray)
    var temp = []
    sudoku(0, emptyArray, link, temp)
}

function sudoku(count, emptyArray, link, temp) {
    if (count == emptyArray.length) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                temp.push(link[i][j])
            }
            console.log(temp.join(' '))
            temp = []
        }
        process.exit(0)
    }

    var y = emptyArray[count][0]
    console.log("y: ", y)
    var x = emptyArray[count][1]
    console.log("x: ", x)
    for (var i = 1; i <= 9; i++) {
        if (isPromising(x, y, i, link)) {
            // true이면 
            link[y][x] = i
            // i를 여기다 넣고 
            sudoku(count + 1, emptyArray, link, temp)
            // 다시 스도쿠 돌리고 
            link[y][x] = 0
            // 근데 안되면 초기화 
        }
    }
}

function isPromising(x, y, num, link) {
    console.log("here y:", y)
    for (var i = 0; i < 9; i++) {
        if (num == link[y][i]) return false
        // 가로에 1~9 중 숫자가 있으면 i는 빈칸에 넣을 수 없으니까 false 
    }

    for (var i = 0; i < 9; i++) {
        if (num == link[i][x]) return false
        // 세로에 1~9 중 숫자가 있으면 i는 빈칸에 넣을 수 없으니까 false 
    }

    var x_ = Math.floor(x / 3) * 3
    // var x_ = x/3*3
    console.log("x_: ", x_)
    var y_ = Math.floor(y / 3) * 3
    // var y_ = y/3*3
    console.log("y_: ", y_)

    for (var i = y_; i < y_ + 3; i++) {
        for (var j = x_; j < x_ + 3; j++) {
            if (num == link[i][j]) return false
        }
    }
    return true
}

function whereIsEmptyPoint(link, emptyArray) {
    for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
            if (link[x][y] === 0) {
                emptyArray.push([x, y])
            }
        }
    }
    return emptyArray
}

sudoku2()