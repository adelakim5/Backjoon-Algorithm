const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim();

if(input.length === 1) {
    console.log(1)
    return 
}

// var test = "cdb=bdbsb=z"
// var str = "b="
// var myRe = new RegExp(str, "g");
// console.log(myRe)
// console.log(test.replace(myRe, " "))

// const usedCroLetters = getUsedCroLetters(input)
// const otherCroLetters = removeUsedCroLettersFrom(input, usedCroLetters)
// console.log(`otherCroLetters ${otherCroLetters}`)
// const answer =  + otherCroLetters.length
console.log(getUsedCroLettersCount(input))


function getUsedCroLettersCount(input) {
    const convertedCroLetter = ['dz=', 'c=', 'c-', 'd-', 'lj', 'nj', 's=', 'z=']
    let usedCroLetters = []
    let newInput = input.slice()

    for (let croLetter of convertedCroLetter) {
        const regExp = new RegExp(croLetter, "gi")
        const matchesArr = newInput.match(regExp)
        if (matchesArr === null) continue
        usedCroLetters.push({
            letter: croLetter,
            cnt: matchesArr.length
        })
        newInput = newInput.replace(regExp, ' ')
    }
    console.log("usedCroLetters:::", usedCroLetters)
    const otherLetters = newInput.replace(/(\s*)/g, "")
    const usedCroLettersCountSum =  usedCroLetters.reduce((acc, val) => acc + val.cnt, 0)
    const totalSum = otherLetters.length + usedCroLettersCountSum
    return totalSum
    // return usedCroLetters
}

// function removeUsedCroLettersFrom(newInput, usedCroLetters) {
//     console.log("replaced newInput:", newInput.replace(/(\s*)/g, ""))
//     console.log("inputed usecCroLetters:", usedCroLetters)
//     if(!usedCroLetters.length) return newInput

//     // for (let usedOne of usedCroLetters) {
//     //     const regExp = new RegExp(usedOne.letter, "gi")
//     //     newInput = newInput.replace(regExp, '')
//     //     console.log("others:", newInput)
//     // }
//     // console.log("total others:", newInput)
//     // return newInput
// }