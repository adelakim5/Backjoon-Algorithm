var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split('\n');
// var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var birthDate = input[0].split(' ').map((e) => e / 1)
var nowDate = input[1].split(' ').map((e) => e / 1)
var age = nowDate[0] - birthDate[0]
var manAge = 0
var countAge = age + 1
var yearAge = age
if (age !== 0) {
    if (nowDate[1] > birthDate[1]) {
        manAge = age
    } else if (nowDate[1] < birthDate[1]) {
        manAge = age - 1
    } else {
        if (nowDate[2] > birthDate[2]) {
            manAge = age
        } else if (nowDate[2] <= birthDate[2]) {
            manAge = age - 1
        }
    }
}
console.log(manAge + '\n' + countAge + '\n' + yearAge)