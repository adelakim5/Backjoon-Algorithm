function b15651() {
    var fs = require('fs');
    // var input = fs.readFileSync('/dev/stdin').toString().split(' ');
    var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split(' ');
    var n = parseInt(input[0])
    var m = parseInt(input[1])
    var ans = []
    for (var s = 1; s <= n; s++) {
        repeatedCom(ans, s.toString(), n, m)
    }
    var answer = ''
    for(var i=0; i<ans.length; i++){
        answer += `${ans[i]}\n`
    }
    console.log(answer)
}

function repeatedCom(ans, str, n, m) {
    var array = str.split(' ')
    if (array.length == m) {
        ans.push(str)
        return
    } else {
        for (var i = 1; i <= n; i++) {
            repeatedCom(ans, str + " " + i.toString(), n, m)
        }
    }
}

b15651()