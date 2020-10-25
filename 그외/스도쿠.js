function b2580() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var link = []

    for (var k = 0; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))

    }
    console.log("link: ", link)

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var candidate1 = []
    var candidate2 = []
    var candidate3 = []

    //  1번 - 행 후보가 되는 숫자들 선별 
    for (var i = 0; i < link.length; i++) {
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (var j = 0; j < link[i].length; j++) {
            if (link[i][j] !== 0) {
                var index = numbers.findIndex(e => e === link[i][j])
                if (index !== -1) {
                    numbers.splice(index, 1)
                }
            }
        }
        candidate1.push([...numbers])
    }

    // 2번 - 열 후보가 되는 숫자들 선별
    for (var i = 0; i < link.length; i++) {
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (var j = 0; j < link[i].length; j++) {
            if (link[j][i] !== 0) {
                var index = numbers.findIndex(e => e === link[j][i])
                if (index !== -1) {
                    numbers.splice(index, 1)
                }
            }
        }
        candidate2.push([...numbers])
    }
    // 3번 - 3x3 후보가 되는 숫자들 선별
    for (var i = 0; i < link.length; i += 3) {
        for (var j = 0; j < link[i].length; j += 3) {
            var visited = new Array(9).fill(false)
            var current = link[i][j]
            dfs(link, current, i, j, numbers, visited)
        }
    }
}

function dfs(link, current, x, y, numbers, visited) {
    if (x < 3) {
        if (y < 3) {
             
        } else if (y >= 3 && y < 6) {

        } else {

        }

    } else if (x >= 3 && x < 6) {
        if (y < 3) {

        } else if (y >= 3 && y < 6) {

        } else {

        }

    } else if (x >= 6 && x < 9) {
        if (y < 3) {

        } else if (y >= 3 && y < 6) {

        } else {

        }

    }
}

b2580()