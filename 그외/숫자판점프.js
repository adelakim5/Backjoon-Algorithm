function b2210() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split('\n');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
    var link = []

    for (var k = 0; k < input.length; k++) {
        link.push(input[k].split(' ').map(e => e / 1))

    }
    console.log("link: ", link)

    var ans = []
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            backTrack(link, ans, link[i][j].toString(), i, j)
            console.log("backTrack ans: ", ans)
        }
    }
    console.log(ans.length)
}

function backTrack(link, ans, str, x, y) {
    var dx = [1, -1, 0, 0]
    var dy = [0, 0, 1, -1]
    console.log("str: ", str)
    
    console.log("x: ", x)
    
    console.log("y: ", y)
    if (str.length == 6) {
        if (ans.every(e => e !== str)) {
            ans.push(str)
            console.log("ans push: ", ans)
        }
        return ans;
    }
    for (var i = 0; i < 4; i++) {
        if (x + dx[i] >= 0 && x + dx[i] < 5 && y + dy[i] >= 0 && y + dy[i] < 5) {
            backTrack(link, ans, str + link[x + dx[i]][y + dy[i]], x + dx[i], y + dy[i])
            console.log("x,y:", x,y,"backTrack in backTrack: ", ans)
        }
    }
}

b2210()