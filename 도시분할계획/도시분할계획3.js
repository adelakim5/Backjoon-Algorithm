var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
var temp = input[0].split(' ')
var n = parseInt(temp[0])
var m = parseInt(temp[1])
for(var i=1; i<input.length; i++){
    
}