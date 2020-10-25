const fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
const input = fs.readFileSync(__dirname + '/stdin.txt').toString().replace(/\r/g, "").trim().split("\n");
const n = input.splice(0, 1)
// console.log(input)

const numArr = getNumArr()

// if(!isPossibleNumber(numArr)) {
//     console.log(-1)
//     return 
// }

const totalRes = matchNumber(numArr)
// console.log(totalRes)
if (totalRes < 0) {
    console.log(totalRes)
    return
}
console.log(getTotalSum(totalRes))
// console.log(totalAve)
// console.log("$$$ answer $$$", answer)

function getNumArr() {
    let total = Array(+n[0])
    // console.log(total)
    for (let i = 0; i < input.length; i++) {
        let line = 3
        for (let j = 0; j < input[i].length; j++) {
            if (j === line) {
                line += 4
                continue
            }
            let index = Math.floor(j / 4)
            if (total[index] === undefined) {
                let obj = {
                    lampArr: [input[i][j]],
                    number: [-1]
                }
                total[index] = obj
            } else {
                console.log("total[index]", total[index])
                console.log("total[index].lampArr:", total[index].lampArr)
                total[index].lampArr.push(input[i][j])
                console.log("total[index].lampArr:", total[index].lampArr)
            }
            if (input[i][j] === "#") {
                const lastIndex = total[index].lampArr.length - 1
                total[index].number.push(lastIndex)
            }
        }
    }
    return total
}

function matchNumber(numArr) {
    let numbers = Array(10)
    numbers[0] = [0, 1, 2, 3, 5, 6, 8, 9, 11, 12, 13, 14]
    numbers[1] = [2, 5, 8, 11, 14]
    numbers[2] = [0, 1, 2, 5, 6, 7, 8, 9, 12, 13, 14]
    numbers[3] = [0, 1, 2, 5, 6, 7, 8, 11, 12, 13, 14]
    numbers[4] = [0, 2, 3, 5, 6, 7, 8, 11, 14]
    numbers[5] = [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14]
    numbers[6] = [0, 1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 14]
    numbers[7] = [0, 1, 2, 5, 8, 11, 14]
    numbers[8] = [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14]
    numbers[9] = [0, 1, 2, 3, 5, 6, 7, 8, 11, 12, 13, 14]

    let totalRes = Array(+n[0])
    // console.log("numArr:", numArr)
    for (let i = 0; i < numArr.length; i++) {
        numArr[i].number.shift()
        let currNumArr = numArr[i].number
        if(!currNumArr.length) {
            let specialObj = {res: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], count:10}
            totalRes[i] = specialObj
            continue
        }
        // console.log("currNumArr:", currNumArr)
        if (currNumArr.length >= 15) return -1
        let res = []
        for (let j = 0; j < numbers.length; j++) {
            if (currNumArr.length > numbers[j].length) continue
            const currNumber = numbers[j]
            // console.log("currNumber:", currNumber)
            let flag = false
            for (let num of currNumArr) {
                // console.log("!!! now the num of currNumArr:", num)
                if (currNumber.every(e => e !== num)) {
                    flag = false
                    break
                }
                flag = true
            }
            // console.log("check flag:", flag, ", numbers' number_index:", j)
            if (!flag) continue
            if (flag) res.push(j)
            // console.log("res:", res)
        }
        if (!res.length) return -1
        if (res.length) totalRes[i] = {
            res: res,
            count: res.length
        }
        console.log("totalRes:", totalRes)
    }
    return totalRes
}

function getTotalSum(totalRes) {
    // const length = totalRes.length - 1
    // console.log("length:", length)
    const totalDigit = totalRes.reduce((acc, val) => acc * val.count, 1)
    // console.log("totalDigit:", totalDigit)
    let totalSum = 0
    for (let i = 0; i < totalRes.length; i++) {
        let currSum = totalRes[i].res.reduce((acc, value) => acc + value)
        currSum *= Math.pow(10, (totalRes.length - 1) - i)
        for (let j = 0; j < totalRes.length; j++) {
            if (j === i) continue
            currSum *= totalRes[j].count
        }
        totalSum += currSum
    }
    console.log("totalSum:", totalSum)
    return (totalSum / totalDigit)
    // for (let i = 0; i < totalRes.length; i++) {
    //     const currRes = totalRes[i].res
    //     const currCount = totalRes[i].count
    //     let digit = Math.pow(10, length - i)
    //     console.log("digit:", digit)
    //     for(let j=0; j<currRes.length; j++) {
    //         console.log("currRes[j]:", currRes[j])
    //         totalSum += ((currRes[j] * digit * totalDigit) / currCount)
    //         console.log("totalSum is calculating...", totalSum)
    //     }
    //     // let currResSum = currRes.reduce((acc, val) => acc + (val * digit), 0)
    //     // let average = currResSum / totalRes[i].count
    //     // totalAve += average
    // }
    // console.log("totalSum:", totalSum)
    // return (totalSum / totalDigit)
    // return totalAve
}