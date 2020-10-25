const fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();
input = input.split('\n').map((e)=>+e)
let answer = 0

let totalVacation = input[0]
let totalKorean = input[1]
let totalMath = input[2]
let dayKorean = input[3]
let dayMath = input[4]
console.log("input:", input)


let studyingDaysForKorean = Math.floor(totalKorean / dayKorean)
console.log("studyingDaysForKorean:", studyingDaysForKorean)
if(totalKorean % dayKorean !== 0 ) studyingDaysForKorean += 1
console.log("* studyingDaysForKorean:", studyingDaysForKorean)
let studyingDaysForMath = Math.floor(totalMath / dayMath)
console.log("studyingDaysForMath:", studyingDaysForMath)
if(totalMath % dayMath !== 0) studyingDaysForMath += 1
console.log("* studyingDaysForMath:", studyingDaysForMath)

if(studyingDaysForKorean > studyingDaysForMath){
    answer = totalVacation - studyingDaysForKorean
} else {
    answer = totalVacation - studyingDaysForMath
}

console.log(answer)