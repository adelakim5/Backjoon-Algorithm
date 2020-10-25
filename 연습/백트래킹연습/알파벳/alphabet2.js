var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString();
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").split('\n');
var number = input[0].split(' ')

var r = parseInt(number[0])
var c = parseInt(number[1])

var visit = new Array(26).fill(false)
var array = new Array(input.length - 1)
for (var i = 1; i < input.length; i++) {
    var ptr = input[i].split('')
    array[i - 1] = ptr
}
console.log(array, visit)

var dx = [1, -1, 0, 0]
var dy = [0, 0, 1, -1]

function backtrack(x, y) {
    var answer = 1
    for (var i = 0; i < 4; i++) {
        if ((x + dx[i] >= 0 && x + dx[i] < r) && (y + dy[i] >= 0 && y + dy[i] < c)) {
            if (!visit[array[x + dx[i]][y + dy[i]].charCodeAt(0) - 'A'.charCodeAt(0)]) {
                visit[array[x + dx[i]][y + dy[i]].charCodeAt(0) - 'A'.charCodeAt(0)] = true
                answer = Math.max(answer, backtrack(x + dx[i], y + dy[i]) + 1)
                visit[array[x + dx[i]][y + dy[i]].charCodeAt(0) - 'A'.charCodeAt(0)] = false
                
            }
        }
    }
    return answer
}

visit[array[0][0].charCodeAt() - 'A'.charCodeAt(0)] = true
console.log(backtrack(0, 0))

console.log('A'.charCodeAt())