const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
if(!input.length) {
    console.log(0)
    return 
}
input = input.split(' ')
console.log(input.length)
