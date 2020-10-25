var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = parseInt(input[0])
var rope = []
for (var i = 1; i < input.length; i++) {
    rope.push(input[i] / 1)
}
rope.sort((a, b) => b - a)
console.log("rope", rope)
var index = 0
var result = 0
var answer = 0
var compare = 0
while (true) {
    if (index === rope.length) break
    // console.log('result:',result)
    compare = rope[index] * (index + 1)
    if (result <= compare) {
        result = compare    
    }
    if (answer < result) {
        answer = result
    }
    index++
}

console.log(answer)