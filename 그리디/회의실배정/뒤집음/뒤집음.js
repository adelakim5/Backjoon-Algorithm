var fs = require('fs');
// const { parse } = require('path');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
input = parseInt(input)
var candidate = input
var reverseCandidate = 0
var result = 0
// console.log("cad:", candidate)
while(true){
    reverseCandidate = reverseNumber(candidate)
    // console.log("rvse:",reverseCandidate)
    result = candidate - reverseCandidate
    console.log("result:", result)
    if(result < 0 || result !== input){
        candidate++
    }
    if(result>0 && result === input) break 
}
console.log(candidate)
function reverseNumber(number){
    var str = number.toString().split('')
    return str.reverse().join('')/1
}

