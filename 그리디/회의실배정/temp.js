var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var n = parseInt(input[0])
var meetings = []
for(var i=1; i<input.length; i++){
    var meeting = input[i].split(' ').map(e=> e/1)
    meetings.push(meeting)
}
console.log(meetings)